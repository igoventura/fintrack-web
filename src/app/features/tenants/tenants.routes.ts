import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

/**
 * Tenant Routes
 * Lazy-loaded routes for tenant management.
 */
export const tenantsRoutes: Routes = [
  {
    path: 'select',
    canActivate: [authGuard], // Must be authenticated
    loadComponent: () =>
      import('./components/tenant-select/tenant-select.component').then(
        (m) => m.TenantSelectComponent,
      ),
  },
];
