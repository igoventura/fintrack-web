import { InjectionToken } from "@angular/core";
import { HttpInterceptor, HttpContextToken } from "@angular/common/http";

/**
 * Injection token for the Fintrack client base API path
 */
export const BASE_PATH_FINTRACK = new InjectionToken<string>('BASE_PATH_FINTRACK', {
    providedIn: 'root',
    factory: () => '/api', // Default fallback
});
/**
 * Injection token for the Fintrack client HTTP interceptor instances
 */
export const HTTP_INTERCEPTORS_FINTRACK = new InjectionToken<HttpInterceptor[]>('HTTP_INTERCEPTORS_FINTRACK', {
    providedIn: 'root',
    factory: () => [], // Default empty array
});
/**
 * HttpContext token to identify requests belonging to the Fintrack client
 */
export const CLIENT_CONTEXT_TOKEN_FINTRACK = new HttpContextToken<string>(() => 'Fintrack');
