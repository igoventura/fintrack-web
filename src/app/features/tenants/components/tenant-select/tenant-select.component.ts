import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TenantService } from '../../../../core/services/tenant.service';
import { CreateTenantDialogComponent } from '../create-tenant-dialog/create-tenant-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../core/services/language.service';
import { MatMenuModule } from '@angular/material/menu';

/**
 * Tenant Selection Component
 * Displays user's tenants and allows selection.
 */
@Component({
  selector: 'app-tenant-select',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    TranslateModule,
    MatMenuModule,
  ],
  templateUrl: './tenant-select.component.html',
  styleUrl: './tenant-select.component.scss',
})
export class TenantSelectComponent implements OnInit {
  private tenantService = inject(TenantService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  languageService = inject(LanguageService); // Public for template access

  loading = signal(false);
  tenants = this.tenantService.userTenants;

  ngOnInit(): void {
    this.loadTenants();
  }

  loadTenants(): void {
    this.loading.set(true);
    this.tenantService.loadUserTenants().subscribe({
      next: () => this.loading.set(false),
      error: () => this.loading.set(false),
    });
  }

  selectTenant(tenantId: string): void {
    this.tenantService.setCurrentTenant(tenantId);
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.router.navigateByUrl(returnUrl);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateTenantDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Tenant was created, navigate to dashboard
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigateByUrl(returnUrl);
      }
    });
  }
}
