import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// Temporary interface until we have the real model
export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: 'credit' | 'debit';
}

@Component({
  selector: 'app-recent-transactions',
  imports: [CommonModule, MatListModule, MatIconModule, MatCardModule],
  template: `
    <mat-card class="transactions-card">
      <mat-card-header>
        <mat-card-title>Recent Transactions</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-list>
          @for (transaction of transactions; track transaction.id) {
            <mat-list-item>
              <mat-icon
                matListItemIcon
                [class.expense]="transaction.type === 'debit'"
                [class.income]="transaction.type === 'credit'"
              >
                {{ transaction.type === 'debit' ? 'arrow_outward' : 'arrow_downward' }}
              </mat-icon>
              <span matListItemTitle>{{ transaction.description }}</span>
              <span matListItemLine>
                {{ transaction.category }} • {{ transaction.date | date }}
              </span>
              <span
                matListItemMeta
                [class.expense-text]="transaction.type === 'debit'"
                [class.income-text]="transaction.type === 'credit'"
              >
                {{ transaction.type === 'debit' ? '-' : '+' }}
                {{ transaction.amount | currency: 'BRL' }}
              </span>
            </mat-list-item>
          } @empty {
            <div class="empty-state">
              <p>No recent transactions</p>
            </div>
          }
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .transactions-card {
      height: 100%;
      border-radius: 16px;
    }

    .expense {
      color: var(--mat-sys-error);
    }
    .income {
      color: var(--mat-sys-primary);
    }

    .expense-text {
      color: var(--mat-sys-error);
      font-weight: 600;
    }
    .income-text {
      color: var(--mat-sys-primary);
      font-weight: 600;
    }

    .empty-state {
      padding: 32px;
      text-align: center;
      color: var(--mat-sys-outline);
    }
  `,
})
export class RecentTransactionsComponent {
  @Input() transactions: Transaction[] = [];
}
