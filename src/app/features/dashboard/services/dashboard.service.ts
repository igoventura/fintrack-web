import { Injectable, signal } from '@angular/core';
import { Transaction } from '../components/recent-transactions/recent-transactions.component';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  // Mock data for now. Will be replaced with real API calls in Phase 7 (Accounts) and Phase 10 (Transactions).
  readonly metrics = signal({
    totalBalance: 12450.5,
    monthlyIncome: 5200.0,
    monthlyExpense: 3150.25,
  });

  readonly recentTransactions = signal<Transaction[]>([
    {
      id: '1',
      description: 'Grocery Store',
      amount: 150.5,
      date: new Date().toISOString(),
      category: 'Food',
      type: 'debit',
    },
    {
      id: '2',
      description: 'Monthly Salary',
      amount: 5000.0,
      date: new Date().toISOString(),
      category: 'Salary',
      type: 'credit',
    },
    {
      id: '3',
      description: 'Electric Bill',
      amount: 120.0,
      date: new Date().toISOString(),
      category: 'Utilities',
      type: 'debit',
    },
    {
      id: '4',
      description: 'Internet',
      amount: 99.9,
      date: new Date().toISOString(),
      category: 'Utilities',
      type: 'debit',
    },
    {
      id: '5',
      description: 'Gas Station',
      amount: 200.0,
      date: new Date().toISOString(),
      category: 'Transport',
      type: 'debit',
    },
  ]);

  loadDashboardData(): void {
    // TODO: Implement API calls to fetch real data
    // this.accountsService.getAccounts()...
    // this.transactionsService.getTransactions()...
  }
}
