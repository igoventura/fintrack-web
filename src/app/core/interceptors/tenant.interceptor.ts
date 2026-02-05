import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

/**
 * Tenant Interceptor
 * Automatically adds X-Tenant-ID header for tenant-scoped requests.
 * Skips public endpoints, authenticated-only endpoints (/users, /tenants).
 */
export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);
  const tenantId = storage.getTenantId();

  // Skip for public and authenticated-only endpoints
  const skipPaths = ['/auth/', '/tenants', '/users/'];
  const shouldSkip = skipPaths.some((path) => req.url.includes(path));

  if (shouldSkip) {
    return next(req);
  }

  // Add X-Tenant-ID header for tenant-scoped endpoints
  if (tenantId) {
    req = req.clone({
      setHeaders: {
        'X-Tenant-ID': tenantId,
      },
    });
  }

  return next(req);
};
