import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

/**
 * Tenant Guard
 * Ensures user has selected a tenant before accessing tenant-scoped routes.
 * Redirects to tenant selection if no tenant is set.
 * Should be used after authGuard.
 */
export const tenantGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const toast = inject(ToastService);
  const tenantId = storage.getTenantId();

  if (!tenantId) {
    // Show feedback to user
    toast.warning('Please select a tenant to continue');

    // Redirect to tenant selection
    router.navigate(['/tenants/select'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  return true;
};
