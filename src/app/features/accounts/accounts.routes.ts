import { Routes } from '@angular/router';
import { AccountListComponent } from './components/account-list/account-list.component';
import { authGuard } from '../../core/guards/auth.guard';
import { tenantGuard } from '../../core/guards/tenant.guard';

export const ACCOUNTS_ROUTES: Routes = [
  {
    path: '', // /accounts
    component: AccountListComponent,
    canActivate: [authGuard, tenantGuard],
  },
  {
    path: 'new', // /accounts/new
    loadComponent: () =>
      import('./components/account-form/account-form.component').then(
        (m) => m.AccountFormComponent,
      ),
    canActivate: [authGuard, tenantGuard],
  },
  {
    path: ':id', // /accounts/:id
    loadComponent: () =>
      import('./components/account-detail/account-detail.component').then(
        (m) => m.AccountDetailComponent,
      ),
    canActivate: [authGuard, tenantGuard],
  },
  {
    path: ':id/edit', // /accounts/:id/edit
    loadComponent: () =>
      import('./components/account-form/account-form.component').then(
        (m) => m.AccountFormComponent,
      ),
    canActivate: [authGuard, tenantGuard],
  },
];
