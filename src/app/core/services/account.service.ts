import { computed, inject, Injectable, signal } from '@angular/core';
import {
  AccountsService,
  Dto_AccountResponse,
  Dto_CreateAccountRequest,
  Dto_UpdateAccountRequest,
} from '../../../api/providers';
import { finalize, tap } from 'rxjs';
import { ToastService } from './toast.service';
import { TenantScopedServiceBase } from './base/tenant-scoped.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService extends TenantScopedServiceBase {
  private readonly apiService = inject(AccountsService);
  private readonly toastService = inject(ToastService);

  private readonly _accounts = signal<Dto_AccountResponse[]>([]);
  private readonly _loading = signal<boolean>(false);

  constructor() {
    super();
  }

  readonly accounts = this._accounts.asReadonly();
  readonly loading = this._loading.asReadonly();

  protected loadData(): void {
    this.loadAccounts();
  }

  protected setEmptyData(): void {
    this._accounts.set([]);
  }

  // Computed signals can be added here, e.g., total balance
  readonly totalBalance = computed(() => {
    return this.accounts().reduce((acc, account) => acc + (account.initial_balance || 0), 0);
  });

  loadAccounts() {
    this._loading.set(true);
    this.apiService
      .accountsGet()
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (accounts) => this._accounts.set(accounts),
        error: (err) => {
          console.error('Failed to load accounts', err);
          this.toastService.error('Failed to load accounts');
        },
      });
  }

  createAccount(dto: Dto_CreateAccountRequest) {
    this._loading.set(true);
    return this.apiService.accountsPost(dto).pipe(
      tap((newAccount) => {
        this._accounts.update((accounts) => {
          // Ensure accounts is always an array
          const currentAccounts = Array.isArray(accounts) ? accounts : [];
          return [...currentAccounts, newAccount];
        });
        this.toastService.success('Account created successfully');
      }),
      finalize(() => this._loading.set(false)),
    );
  }

  updateAccount(id: string, dto: Dto_UpdateAccountRequest) {
    this._loading.set(true);
    return this.apiService.accountsIdPut(id, dto).pipe(
      tap((updatedAccount) => {
        this._accounts.update((accounts) => {
          // Ensure accounts is always an array
          const currentAccounts = Array.isArray(accounts) ? accounts : [];
          return currentAccounts.map((acc) => (acc.id === id ? updatedAccount : acc));
        });
        this.toastService.success('Account updated successfully');
      }),
      finalize(() => this._loading.set(false)),
    );
  }

  deleteAccount(id: string) {
    this._loading.set(true);
    return this.apiService.accountsIdDelete(id).pipe(
      tap(() => {
        this._accounts.update((accounts) => {
          // Ensure accounts is always an array
          const currentAccounts = Array.isArray(accounts) ? accounts : [];
          return currentAccounts.filter((acc) => acc.id !== id);
        });
        this.toastService.success('Account deleted successfully');
      }),
      finalize(() => this._loading.set(false)),
    );
  }

  getAccountById(id: string): Dto_AccountResponse | undefined {
    return this.accounts().find((acc) => acc.id === id);
  }
}
