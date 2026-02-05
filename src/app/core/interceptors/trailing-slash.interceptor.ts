import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Trailing Slash Interceptor
 * Appends a trailing slash to all API requests to matching the backend behavior.
 * This prevents 3xx redirects that strip the proxy path prefix.
 */
export const trailingSlashInterceptor: HttpInterceptorFn = (req, next) => {
  // Only modify API requests (starting with /api) matching environment.apiUrl
  if (req.url.startsWith('/api')) {
    const [url, query] = req.url.split('?');

    // If matches API path and doesn't end with slash, append it
    if (!url.endsWith('/')) {
      const newUrl = query ? `${url}/?${query}` : `${url}/`;
      req = req.clone({
        url: newUrl,
      });
    }
  }

  return next(req);
};
