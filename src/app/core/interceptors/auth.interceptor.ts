import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

/**
 * Auth Interceptor
 * Automatically adds Authorization header with JWT token to authenticated requests.
 * Skips public endpoints (login, register).
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);
  const token = storage.getAuthToken();

  // Public endpoints - no auth required
  const publicEndpoints = ['/auth/login', '/auth/register'];
  const isPublic = publicEndpoints.some((endpoint) => req.url.includes(endpoint));

  if (isPublic) {
    return next(req);
  }

  // Add Authorization header for all other endpoints
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
