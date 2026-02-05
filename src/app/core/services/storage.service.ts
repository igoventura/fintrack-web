import { Injectable } from '@angular/core';

/**
 * Type-safe wrapper around localStorage API.
 * Provides methods for storing and retrieving data with automatic JSON serialization.
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // Storage keys
  private readonly AUTH_TOKEN_KEY = 'auth_token';
  private readonly TENANT_ID_KEY = 'tenant_id';
  private readonly USER_PREFS_KEY = 'user_preferences';

  /**
   * Store a value in localStorage with automatic JSON serialization.
   * @param key Storage key
   * @param value Value to store
   */
  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error('Error storing value in localStorage:', error);
      // Handle quota exceeded error
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.error('localStorage quota exceeded');
      }
    }
  }

  /**
   * Retrieve a value from localStorage with automatic JSON deserialization.
   * @param key Storage key
   * @returns The stored value or null if not found
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error retrieving value from localStorage:', error);
      return null;
    }
  }

  /**
   * Remove a value from localStorage.
   * @param key Storage key to remove
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing value from localStorage:', error);
    }
  }

  /**
   * Clear all values from localStorage.
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  // Specialized methods for common data

  /**
   * Get the authentication token.
   */
  getAuthToken(): string | null {
    return this.get<string>(this.AUTH_TOKEN_KEY);
  }

  /**
   * Set the authentication token.
   * @param token JWT token string
   */
  setAuthToken(token: string): void {
    this.set(this.AUTH_TOKEN_KEY, token);
  }

  /**
   * Remove the authentication token.
   */
  removeAuthToken(): void {
    this.remove(this.AUTH_TOKEN_KEY);
  }

  /**
   * Get the current tenant ID.
   */
  getTenantId(): string | null {
    return this.get<string>(this.TENANT_ID_KEY);
  }

  /**
   * Set the current tenant ID.
   * @param id Tenant ID
   */
  setTenantId(id: string): void {
    this.set(this.TENANT_ID_KEY, id);
  }

  /**
   * Remove the tenant ID.
   */
  removeTenantId(): void {
    this.remove(this.TENANT_ID_KEY);
  }

  /**
   * Get user preferences.
   */
  getUserPreferences<T = Record<string, unknown>>(): T | null {
    return this.get<T>(this.USER_PREFS_KEY);
  }

  /**
   * Set user preferences.
   * @param preferences User preferences object
   */
  setUserPreferences<T = Record<string, unknown>>(preferences: T): void {
    this.set(this.USER_PREFS_KEY, preferences);
  }

  /**
   * Remove user preferences.
   */
  removeUserPreferences(): void {
    this.remove(this.USER_PREFS_KEY);
  }
}
