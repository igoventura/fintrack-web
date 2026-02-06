import { computed, inject, Injectable, signal } from '@angular/core';
import {
  TransactionsService,
  Dto_TransactionResponse,
  Dto_CreateTransactionRequest,
  Dto_UpdateTransactionRequest,
} from '../../../api/providers';
import { finalize, tap } from 'rxjs';
import { ToastService } from './toast.service';

export interface TransactionFilters {
  accrualMonth?: string; // YYYYMM format
  accountId?: string;
  categoryId?: string;
  transactionType?: 'credit' | 'debit' | 'transfer' | 'payment';
  paymentStatus?: 'all' | 'paid' | 'unpaid';
  tagIds?: string[];
  startDate?: string;
  endDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly apiService = inject(TransactionsService);
  private readonly toastService = inject(ToastService);

  private readonly _transactions = signal<Dto_TransactionResponse[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _filters = signal<TransactionFilters>({});

  readonly transactions = this._transactions.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly filters = this._filters.asReadonly();

  // Computed signal to filter transactions based on current filters
  readonly filteredTransactions = computed(() => {
    const transactions = this.transactions();
    const filters = this.filters();

    if (!transactions || transactions.length === 0) {
      return [];
    }

    return transactions.filter((transaction) => {
      // Filter by accrual month
      if (filters.accrualMonth && transaction.accrual_month !== filters.accrualMonth) {
        return false;
      }

      // Filter by account
      if (filters.accountId && transaction.from_account_id !== filters.accountId) {
        return false;
      }

      // Filter by category
      if (filters.categoryId && transaction.category_id !== filters.categoryId) {
        return false;
      }

      // Filter by transaction type
      if (filters.transactionType && transaction.transaction_type !== filters.transactionType) {
        return false;
      }

      // Filter by payment status
      if (filters.paymentStatus && filters.paymentStatus !== 'all') {
        const isPaid = !!transaction.payment_date;
        if (filters.paymentStatus === 'paid' && !isPaid) return false;
        if (filters.paymentStatus === 'unpaid' && isPaid) return false;
      }

      // Filter by date range
      if (filters.startDate && transaction.due_date && transaction.due_date < filters.startDate) {
        return false;
      }
      if (filters.endDate && transaction.due_date && transaction.due_date > filters.endDate) {
        return false;
      }

      // Filter by tags (if tagIds is set and not empty)
      if (filters.tagIds && filters.tagIds.length > 0) {
        const transactionTags = transaction.tag_ids || [];
        // Check if transaction has at least one of the selected tags
        const hasMatchingTag = filters.tagIds.some((tagId) => transactionTags.includes(tagId));
        if (!hasMatchingTag) return false;
      }

      return true;
    });
  });

  loadTransactions(filters?: TransactionFilters) {
    this._loading.set(true);

    // Apply filters if provided
    if (filters) {
      this._filters.set(filters);
    }

    const currentFilters = this._filters();

    this.apiService
      .transactionsGet(
        currentFilters.accrualMonth,
        currentFilters.accountId,
        currentFilters.transactionType,
      )
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (transactions) => this._transactions.set(transactions),
        error: (err) => {
          console.error('Failed to load transactions', err);
          this.toastService.error('Failed to load transactions');
        },
      });
  }

  createTransaction(dto: Dto_CreateTransactionRequest) {
    this._loading.set(true);
    return this.apiService.transactionsPost(dto).pipe(
      tap((newTransaction) => {
        this._transactions.update((transactions) => {
          const currentTransactions = Array.isArray(transactions) ? transactions : [];
          return [...currentTransactions, newTransaction];
        });
        this.toastService.success('Transaction created successfully');
      }),
      finalize(() => this._loading.set(false)),
    );
  }

  updateTransaction(id: string, dto: Dto_UpdateTransactionRequest) {
    this._loading.set(true);
    return this.apiService.transactionsIdPut(id, dto).pipe(
      tap((updatedTransaction) => {
        this._transactions.update((transactions) => {
          const currentTransactions = Array.isArray(transactions) ? transactions : [];
          return currentTransactions.map((txn) => (txn.id === id ? updatedTransaction : txn));
        });
        this.toastService.success('Transaction updated successfully');
      }),
      finalize(() => this._loading.set(false)),
    );
  }

  deleteTransaction(id: string) {
    this._loading.set(true);
    return this.apiService.transactionsIdDelete(id).pipe(
      tap(() => {
        this._transactions.update((transactions) => {
          const currentTransactions = Array.isArray(transactions) ? transactions : [];
          return currentTransactions.filter((txn) => txn.id !== id);
        });
        this.toastService.success('Transaction deleted successfully');
      }),
      finalize(() => this._loading.set(false)),
    );
  }

  getTransactionById(id: string): Dto_TransactionResponse | undefined {
    return this.transactions().find((txn) => txn.id === id);
  }

  setFilters(filters: TransactionFilters) {
    this._filters.set(filters);
  }

  resetFilters() {
    this._filters.set({});
  }
}
