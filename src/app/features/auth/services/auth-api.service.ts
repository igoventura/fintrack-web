import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, tap, catchError } from 'rxjs';
import { AuthService } from '../../../../api/providers/services/auth.service';
import { UsersService } from '../../../../api/providers/services/users.service';
import {
  Dto_AuthResponse,
  Dto_RegisterRequest,
  Dto_UserResponse,
} from '../../../../api/providers/models';
import { StorageService } from '../../../core/services/storage.service';
import { ToastService } from '../../../core/services/toast.service';

/**
 * Auth API Service
 * Wraps generated AuthService with signal-based state management.
 * Handles login, register, logout, and auth state persistence.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private authService = inject(AuthService);
  private usersService = inject(UsersService);
  private storage = inject(StorageService);
  private toast = inject(ToastService);
  private router = inject(Router);

  // State signals
  currentUser = signal<Dto_UserResponse | null>(null);
  isAuthenticated = computed(() => !!this.currentUser());
  authToken = signal<string | null>(null);

  /**
   * Login with username and password.
   * Stores tokens and user data on success.
   */
  login(username: string, password: string): Observable<Dto_AuthResponse> {
    return this.authService.authLoginPost(username, password).pipe(
      tap((response) => {
        this.handleAuthResponse(response);
        this.toast.success('Login successful!');
      }),
      catchError((error) => {
        this.toast.error('Login failed. Please check your credentials.');
        return throwError(() => error);
      }),
    );
  }

  /**
   * Register a new user.
   * Stores tokens and user data on success.
   */
  register(data: Dto_RegisterRequest): Observable<Dto_AuthResponse> {
    return this.authService.authRegisterPost(data).pipe(
      tap((response) => {
        this.handleAuthResponse(response);
        this.toast.success('Registration successful!');
      }),
      catchError((error) => {
        const message = error.error?.message || 'Registration failed';
        this.toast.error(message);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Logout current user.
   * Clears all stored data and navigates to login.
   */
  logout(): void {
    this.storage.removeAuthToken();
    this.storage.removeTenantId();
    this.storage.remove('refresh_token');
    this.authToken.set(null);
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
    this.toast.info('Logged out successfully');
  }

  /**
   * Check authentication status on app init.
   * Fetches user profile if token exists.
   */
  checkAuth(): void {
    const token = this.storage.getAuthToken();
    if (token) {
      this.authToken.set(token);

      // Fetch user profile from API
      this.usersService.usersProfileGet().subscribe({
        next: (user) => {
          this.currentUser.set(user);
        },
        error: () => {
          // Token is invalid, clear auth state
          this.logout();
        },
      });
    }
  }

  /**
   * Handle auth response from login/register.
   * Stores tokens and sets user state.
   */
  private handleAuthResponse(response: Dto_AuthResponse): void {
    if (response.access_token) {
      this.storage.setAuthToken(response.access_token);
      this.authToken.set(response.access_token);
    }

    if (response.refresh_token) {
      this.storage.set('refresh_token', response.refresh_token);
    }

    if (response.user) {
      // For now, use the user from auth response
      // In the future, this will be Dto_UserResponse from profile endpoint
      this.currentUser.set(response.user as unknown as Dto_UserResponse);
    }
  }
}
