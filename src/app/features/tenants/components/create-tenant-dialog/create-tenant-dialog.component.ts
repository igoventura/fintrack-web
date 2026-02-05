import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TenantService } from '../../../../core/services/tenant.service';

/**
 * Create Tenant Dialog Component
 * Material dialog for creating a new tenant.
 */
@Component({
  selector: 'app-create-tenant-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './create-tenant-dialog.component.html',
  styleUrl: './create-tenant-dialog.component.scss',
})
export class CreateTenantDialogComponent {
  private tenantService = inject(TenantService);
  private dialogRef = inject(MatDialogRef<CreateTenantDialogComponent>);

  loading = signal(false);

  tenantForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  onSubmit(): void {
    if (this.tenantForm.invalid) {
      this.tenantForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { name } = this.tenantForm.value;

    this.tenantService.createTenant(name!).subscribe({
      next: () => {
        this.loading.set(false);
        this.dialogRef.close(true); // Success
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
