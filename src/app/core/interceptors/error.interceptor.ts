import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

/**
 * Error Interceptor
 * Centralized HTTP error handling with toast notifications.
 * Handles 401 (redirect to login), 403, 404, 500+ errors.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const storage = inject(StorageService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 401:
            errorMessage = 'Session expired. Please login again.';
            storage.removeAuthToken();
            storage.removeTenantId();
            router.navigate(['/auth/login']);
            break;
          case 403:
            errorMessage = 'Access denied. You do not have permission.';
            break;
          case 404:
            errorMessage = 'Resource not found.';
            break;
          case 500:
          case 502:
          case 503:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = error.error?.message || 'An unexpected error occurred';
        }
      }

      // Show toast notification
      toast.error(errorMessage);

      // Log in development
      console.error('HTTP Error:', error);

      return throwError(() => error);
    }),
  );
};
