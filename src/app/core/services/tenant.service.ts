import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { TenantsService } from '../../../api/providers/services/tenants.service';
import { UsersService } from '../../../api/providers/services/users.service';
import { Dto_TenantResponse, Dto_UserTenantResponse } from '../../../api/providers/models';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';

/**
 * Tenant Service
 * Manages tenant context with signal-based state management.
 * Handles tenant selection, creation, and user's tenant list.
 */
@Injectable({
  providedIn: 'root',
})
export class TenantService {
  private tenantsService = inject(TenantsService);
  private usersService = inject(UsersService);
  private storage = inject(StorageService);
  private toast = inject(ToastService);

  // State signals
  currentTenantId = signal<string | null>(null);
  currentTenant = signal<Dto_TenantResponse | null>(null);
  userTenants = signal<Dto_UserTenantResponse[]>([]);

  /**
   * Load user's tenants from API.
   * Updates userTenants signal.
   */
  loadUserTenants(): Observable<Dto_UserTenantResponse[]> {
    return this.usersService.usersTenantsGet().pipe(
      tap((tenants) => {
        this.userTenants.set(tenants);
      }),
      catchError((error) => {
        this.toast.error('Failed to load tenants');
        return throwError(() => error);
      }),
    );
  }

  /**
   * Set current tenant by ID.
   * Stores in localStorage and updates state.
   */
  setCurrentTenant(tenantId: string): void {
    const tenant = this.userTenants().find((t) => t.tenant_id === tenantId);
    if (tenant) {
      this.currentTenantId.set(tenantId);
      this.storage.setTenantId(tenantId);
      this.toast.success(`Switched to ${tenant.name}`);
    }
  }

  /**
   * Create a new tenant.
   * Reloads user's tenants (API automatically links new tenant to user).
   * Auto-selects the newly created tenant.
   */
  createTenant(name: string): Observable<Dto_TenantResponse> {
    return this.tenantsService.tenantsPost({ name }).pipe(
      tap((tenant) => {
        // Reload user's tenants (backend handles linking)
        this.loadUserTenants().subscribe();
        // Auto-select new tenant
        this.setCurrentTenant(tenant.id!);
        this.toast.success('Tenant created successfully!');
      }),
      catchError((error) => {
        const message = error.error?.message || 'Failed to create tenant';
        this.toast.error(message);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Get current tenant ID.
   * Used by tenant interceptor.
   */
  getCurrentTenantId(): string | null {
    return this.currentTenantId();
  }

  /**
   * Check tenant context on app init.
   * Loads tenant ID from localStorage if it exists.
   */
  checkTenantContext(): void {
    const tenantId = this.storage.getTenantId();
    if (tenantId) {
      this.currentTenantId.set(tenantId);
    }
  }
}
