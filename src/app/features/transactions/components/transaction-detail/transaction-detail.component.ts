import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TransactionService } from '../../../../core/services/transaction.service';
import { Dto_TransactionResponse } from '../../../../../api/providers';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-transaction-detail',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionDetailComponent implements OnInit {
  private readonly transactionService = inject(TransactionService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  transaction: Dto_TransactionResponse | undefined;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        take(1),
      )
      .subscribe((id) => {
        if (id) {
          this.transaction = this.transactionService.getTransactionById(id);
          if (!this.transaction) {
            this.router.navigate(['/transactions']);
          }
        }
      });
  }

  deleteTransaction() {
    if (this.transaction && window.confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(this.transaction.id!).subscribe({
        next: () => this.router.navigate(['/transactions']),
      });
    }
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
