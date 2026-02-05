import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

/**
 * Sidenav Component
 * Navigation links for the application.
 */
@Component({
  selector: 'app-sidenav',
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
  template: `
    <mat-nav-list>
      @for (item of navItems; track item.path) {
        <a mat-list-item [routerLink]="item.path" routerLinkActive="active-link">
          <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
          <span matListItemTitle>{{ item.label }}</span>
        </a>
      }
    </mat-nav-list>
  `,
  styles: `
    .active-link {
      background-color: var(--mat-sys-secondary-container);
      color: var(--mat-sys-on-secondary-container);

      mat-icon {
        color: var(--mat-sys-on-secondary-container);
      }
    }
  `,
})
export class SidenavComponent {
  navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { label: 'Accounts', path: '/accounts', icon: 'account_balance' },
    { label: 'Transactions', path: '/transactions', icon: 'receipt_long' },
    { label: 'Categories', path: '/categories', icon: 'category' },
    { label: 'Tags', path: '/tags', icon: 'label' },
  ];
}
