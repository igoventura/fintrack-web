import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TransactionService } from '../../../../core/services/transaction.service';
import {
  Dto_AccountResponse,
  Dto_CategoryResponse,
  Dto_TransactionResponse,
} from '../../../../../api/providers';
import { AccountService } from '../../../../core/services/account.service';
import { AppIconComponent } from '../../../../shared/components/app-icon/app-icon.component';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-transaction-list',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule,
    AppIconComponent,
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListComponent implements OnInit {
  private readonly transactionService = inject(TransactionService);
  private readonly accountService = inject(AccountService);
  private readonly categoryService = inject(CategoryService);

  readonly accounts = this.accountService.accounts;
  readonly categories = this.categoryService.categories;
  readonly transactions = this.transactionService.filteredTransactions;
  readonly loading = this.transactionService.loading;

  displayedColumns: string[] = [
    'due_date',
    'type',
    'amount',
    'from_account',
    'category',
    'payment_status',
    'actions',
  ];

  ngOnInit(): void {
    this.transactionService.loadTransactions();
    this.categoryService.loadCategories();
    this.accountService.loadAccounts();
  }

  deleteTransaction(transaction: Dto_TransactionResponse, event: Event) {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(transaction.id!).subscribe();
    }
  }

  getPaymentStatus(transaction: Dto_TransactionResponse): string {
    return transaction.payment_date ? 'paid' : 'unpaid';
  }

  formatCurrency(amount: number | undefined, currency: string | undefined): string {
    if (!amount) return '-';
    const locale = 'pt-BR';
    const currencyCode = currency || 'BRL';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  }

  getAccount(accountId: string): Dto_AccountResponse {
    return this.accounts().find((a) => a.id === accountId)!;
  }

  getCategory(categoryId: string): Dto_CategoryResponse {
    return this.categories().find((c) => c.id === categoryId)!;
  }
}
