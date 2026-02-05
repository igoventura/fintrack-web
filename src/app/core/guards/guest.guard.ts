import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

/**
 * Guest Guard
 * Prevents authenticated users from accessing guest-only pages (login, register).
 * Redirects to dashboard if user is already authenticated.
 */
export const guestGuard: CanActivateFn = (_route, _state) => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const token = storage.getAuthToken();

  if (token) {
    // User is authenticated, redirect to dashboard
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
