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
import { Dto_TransactionResponse } from '../../../../../api/providers';

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
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListComponent implements OnInit {
  private readonly transactionService = inject(TransactionService);

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
}
