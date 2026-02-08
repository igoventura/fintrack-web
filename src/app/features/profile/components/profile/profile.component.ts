import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../../../core/services/user.service';
import { HeaderComponent } from '../../../../shared/components/header/header';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HeaderComponent,
  ],
  template: `
    <div class="container">
      <app-header title="Profile"></app-header>

      <div class="profile-container">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Account Information</mat-card-title>
            <mat-card-subtitle>Manage your personal details</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            @if (loading()) {
              <div class="loading-spinner">
                <mat-spinner diameter="40"></mat-spinner>
              </div>
            }

            <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Full Name</mat-label>
                  <input matInput formControlName="name" placeholder="John Doe" />
                  @if (profileForm.get('name')?.hasError('required')) {
                    <mat-error>Full name is required</mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Email Address</mat-label>
                  <input matInput formControlName="email" placeholder="john@example.com" />
                  @if (profileForm.get('email')?.hasError('required')) {
                    <mat-error>Email is required</mat-error>
                  }
                  @if (profileForm.get('email')?.hasError('email')) {
                    <mat-error>Please enter a valid email address</mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="actions">
                <button
                  mat-raised-button
                  color="primary"
                  type="submit"
                  [disabled]="profileForm.invalid || profileForm.pristine || submitting()"
                >
                  @if (submitting()) {
                    <mat-spinner
                      diameter="20"
                      color="accent"
                      style="display:inline-block; vertical-align:middle; margin-right: 8px"
                    ></mat-spinner>
                  }
                  Save Changes
                </button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  profileForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  loading = signal(false);
  submitting = signal(false);

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.loading.set(true);
    this.userService.loadProfile().subscribe({
      next: (profile) => {
        this.profileForm.patchValue({
          name: profile.name,
          email: profile.email,
        });
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.submitting.set(true);
      const { name, email } = this.profileForm.value;

      this.userService
        .updateProfile({
          name: name || '',
          email: email || '',
        })
        .subscribe({
          next: () => {
            this.submitting.set(false);
            this.profileForm.markAsPristine();
          },
          error: () => this.submitting.set(false),
        });
    }
  }
}
