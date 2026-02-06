import { Routes } from '@angular/router';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { authGuard } from '../../core/guards/auth.guard';
import { tenantGuard } from '../../core/guards/tenant.guard';

export const TRANSACTIONS_ROUTES: Routes = [
  {
    path: '', // /transactions
    component: TransactionListComponent,
    canActivate: [authGuard, tenantGuard],
  },
  {
    path: 'new', // /transactions/new
    loadComponent: () =>
      import('./components/transaction-form/transaction-form.component').then(
        (m) => m.TransactionFormComponent,
      ),
    canActivate: [authGuard, tenantGuard],
  },
  {
    path: ':id', // /transactions/:id
    loadComponent: () =>
      import('./components/transaction-detail/transaction-detail.component').then(
        (m) => m.TransactionDetailComponent,
      ),
    canActivate: [authGuard, tenantGuard],
  },
  {
    path: ':id/edit', // /transactions/:id/edit
    loadComponent: () =>
      import('./components/transaction-form/transaction-form.component').then(
        (m) => m.TransactionFormComponent,
      ),
    canActivate: [authGuard, tenantGuard],
  },
];
