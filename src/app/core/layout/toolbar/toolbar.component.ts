import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthApiService } from '../../../features/auth/services/auth-api.service';
import { TenantService } from '../../services/tenant.service';

/**
 * Toolbar Component
 * Top bar application header with user menu and drawer toggle.
 */
@Component({
  selector: 'app-toolbar',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <mat-toolbar color="primary" class="toolbar">
      <button mat-icon-button (click)="menuClick.emit()" class="menu-button">
        <mat-icon>menu</mat-icon>
      </button>

      <span class="spacer"></span>

      <!-- Tenant Name -->
      @if (currentTenant()) {
        <span class="tenant-name">{{ currentTenant()?.name }}</span>
      }

      <button mat-icon-button [matMenuTriggerFor]="userMenu">
        <mat-icon>account_circle</mat-icon>
      </button>

      <mat-menu #userMenu="matMenu">
        <button mat-menu-item>
          <mat-icon>person</mat-icon>
          <span>Profile</span>
        </button>
        <button mat-menu-item (click)="logout()">
          <mat-icon>logout</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: `
    .toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: var(--mat-sys-level1);
    }

    .spacer {
      flex: 1 1 auto;
    }

    .tenant-name {
      margin-right: 16px;
      font-size: 14px;
      font-weight: 500;
    }
  `,
})
export class ToolbarComponent {
  @Output() menuClick = new EventEmitter<void>();

  private authService = inject(AuthApiService);
  private tenantService = inject(TenantService);

  currentTenant = this.tenantService.currentTenant;

  logout(): void {
    this.authService.logout();
  }
}
