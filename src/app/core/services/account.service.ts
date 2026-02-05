import { computed, inject, Injectable, signal } from '@angular/core';
import {
  AccountsService,
  Dto_AccountResponse,
  Dto_CreateAccountRequest,
} from '../../../api/providers';
import { finalize, tap, throwError } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly apiService = inject(AccountsService);
  private readonly toastService = inject(ToastService);

  private readonly _accounts = signal<Dto_AccountResponse[]>([]);
  private readonly _loading = signal<boolean>(false);

  readonly accounts = this._accounts.asReadonly();
  readonly loading = this._loading.asReadonly();

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
        this._accounts.update((accounts) => [...accounts, newAccount]);
        this.toastService.success('Account created successfully');
      }),
      finalize(() => this._loading.set(false)),
    );
  }

  // TODO: Implement updateAccount once backend endpoint is ready
  updateAccount(id: string, dto: any) {
    this.toastService.info('Update account feature coming soon!');
    return throwError(() => new Error('Not implemented'));
  }

  // TODO: Implement deleteAccount once backend endpoint is ready
  deleteAccount(id: string) {
    this.toastService.info('Delete account feature coming soon!');
    return throwError(() => new Error('Not implemented'));
  }

  getAccountById(id: string): Dto_AccountResponse | undefined {
    return this.accounts().find((acc) => acc.id === id);
  }
}
