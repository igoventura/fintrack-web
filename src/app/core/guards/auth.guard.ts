import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

/**
 * Auth Guard
 * Protects routes that require authentication.
 * Redirects to login if user is not authenticated.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const toast = inject(ToastService);
  const token = storage.getAuthToken();

  if (!token) {
    // Show feedback to user
    toast.warning('Please login to access this page');

    // Redirect to login, preserving the intended destination
    router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  return true;
};
