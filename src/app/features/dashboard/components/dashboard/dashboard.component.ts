import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewCardComponent } from '../../components/overview-card/overview-card.component';
import { RecentTransactionsComponent } from '../../components/recent-transactions/recent-transactions.component';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, OverviewCardComponent, RecentTransactionsComponent],
  template: `
    <div class="dashboard-container">
      <div class="metrics-grid">
        <app-overview-card
          title="Total Balance"
          [value]="metrics().totalBalance"
          icon="account_balance_wallet"
          variant="neutral"
        >
        </app-overview-card>

        <app-overview-card
          title="Income"
          [value]="metrics().monthlyIncome"
          icon="trending_up"
          variant="success"
          [trend]="12"
        >
        </app-overview-card>

        <app-overview-card
          title="Expenses"
          [value]="metrics().monthlyExpense"
          icon="trending_down"
          variant="danger"
          [trend]="-5"
        >
        </app-overview-card>
      </div>

      <div class="content-grid">
        <app-recent-transactions [transactions]="transactions()"></app-recent-transactions>
      </div>
    </div>
  `,
  styles: `
    .dashboard-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
    }

    @media (max-width: 600px) {
      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  metrics = this.dashboardService.metrics;
  transactions = this.dashboardService.recentTransactions;

  ngOnInit(): void {
    this.dashboardService.loadDashboardData();
  }
}
