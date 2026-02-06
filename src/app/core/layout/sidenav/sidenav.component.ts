import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { TenantService } from '../../services/tenant.service';
import { LanguageService } from '../../services/language.service';

/**
 * Sidenav Component
 * Navigation links for the application.
 */
@Component({
  selector: 'app-sidenav',
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    TranslateModule,
  ],
  template: `
    <div class="sidenav-content">
      <mat-nav-list class="nav-list">
        @for (item of navItems; track item.path) {
          <a mat-list-item [routerLink]="item.path" routerLinkActive="active-link">
            <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
            <span matListItemTitle>{{ item.labelKey | translate }}</span>
          </a>
        }
      </mat-nav-list>

      <div class="sidenav-footer">
        <mat-divider></mat-divider>

        <!-- Language Switcher -->
        <div class="footer-row">
          <button mat-button [matMenuTriggerFor]="langMenu" class="footer-button">
            <mat-icon>language</mat-icon>
            <span>{{ getCurrentLangLabel() }}</span>
          </button>

          <mat-menu #langMenu="matMenu">
            @for (lang of languageService.supportedLanguages; track lang.code) {
              <button mat-menu-item (click)="languageService.setLanguage(lang.code)">
                <mat-icon>{{
                  languageService.currentLang() === lang.code ? 'check' : ''
                }}</mat-icon>
                <span>{{ lang.label }}</span>
              </button>
            }
          </mat-menu>
        </div>

        <!-- Tenant Switcher -->
        <div class="footer-row">
          <button mat-button [matMenuTriggerFor]="tenantMenu" class="footer-button">
            <mat-icon>business</mat-icon>
            <span class="truncate">{{
              tenantService.currentTenant()?.name || ('SIDENAV.SELECT_TENANT' | translate)
            }}</span>
          </button>

          <mat-menu #tenantMenu="matMenu">
            @for (tenant of tenants(); track tenant.tenant_id) {
              <button mat-menu-item (click)="tenantService.setCurrentTenant(tenant.tenant_id!)">
                <mat-icon>{{
                  tenantService.currentTenantId() === tenant.tenant_id ? 'check' : 'business'
                }}</mat-icon>
                <span>{{ tenant.name }}</span>
              </button>
            }
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="createTenant()">
              <mat-icon>add</mat-icon>
              <span>{{ 'SIDENAV.CREATE_TENANT' | translate }}</span>
            </button>
          </mat-menu>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: calc(100% - 50px);
    }

    .sidenav-content {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .nav-list {
      flex-grow: 1;
    }

    .active-link {
      background-color: var(--mat-sys-secondary-container);
      color: var(--mat-sys-on-secondary-container);

      mat-icon {
        color: var(--mat-sys-on-secondary-container);
      }
    }

    .sidenav-footer {
      padding: 8px;
      background-color: var(--mat-sys-surface-container-low);
    }

    .footer-row {
      display: flex;
      margin-top: 4px;
    }

    .footer-button {
      width: 100%;
      justify-content: flex-start;
      text-align: left;

      ::ng-deep .mdc-button__label {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
      }

      .truncate {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  `,
})
export class SidenavComponent implements OnInit {
  tenantService = inject(TenantService);
  languageService = inject(LanguageService);
  private router = inject(Router);
  readonly tenants = this.tenantService.userTenants;

  navItems = [
    { labelKey: 'SIDENAV.DASHBOARD', path: '/dashboard', icon: 'dashboard' },
    { labelKey: 'SIDENAV.ACCOUNTS', path: '/accounts', icon: 'account_balance' },
    { labelKey: 'SIDENAV.TRANSACTIONS', path: '/transactions', icon: 'receipt_long' },
    { labelKey: 'SIDENAV.CATEGORIES', path: '/categories', icon: 'category' },
    { labelKey: 'SIDENAV.TAGS', path: '/tags', icon: 'label' },
  ];

  getCurrentLangLabel(): string {
    const current = this.languageService.currentLang();
    return (
      this.languageService.supportedLanguages.find((l) => l.code === current)?.label || 'Language'
    );
  }

  createTenant() {
    this.router.navigate(['/tenants/select']);
  }

  ngOnInit(): void {
    this.tenantService.loadUserTenants();
  }
}
