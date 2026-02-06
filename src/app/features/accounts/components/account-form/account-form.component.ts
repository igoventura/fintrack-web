import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AccountService } from '../../../../core/services/account.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ACCOUNT_COLORS, ACCOUNT_ICONS } from '../../../../core/constants';
import { AppIconComponent } from '../../../../shared/components/app-icon/app-icon.component';
import {
  Domain_AccountType,
  Dto_CreateAccountRequest,
  Dto_UpdateAccountRequest,
} from '../../../../../api/providers';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    AppIconComponent,
  ],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly accountService = inject(AccountService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  readonly loading = this.accountService.loading;
  readonly isEditMode = signal(false);
  readonly accountId = signal<string | null>(null);

  readonly accountTypes = Object.values(Domain_AccountType);
  readonly currencies = ['USD', 'BRL', 'EUR', 'GBP']; // TODO: Move to a constant or configurable list

  // Colors matching CSS variables
  readonly colorPalette = ACCOUNT_COLORS;
  readonly icons = ACCOUNT_ICONS;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    type: [Domain_AccountType.Bank, [Validators.required]],
    initial_balance: [0, [Validators.required]],
    currency: ['BRL', [Validators.required]], // Default to BRL
    color: ['var(--color-bronze)', [Validators.required]], // Default Bronze
    icon: ['wallet', [Validators.required]],
  });

  selectColor(color: string) {
    this.form.controls.color.setValue(color);
  }

  selectIcon(icon: (typeof ACCOUNT_ICONS)[0]) {
    this.form.patchValue({
      icon: icon.name,
      color: icon.defaultColor,
    });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        take(1),
      )
      .subscribe((id) => {
        if (id) {
          this.isEditMode.set(true);
          this.accountId.set(id);
          this.loadAccount(id);
        }
      });
  }

  private loadAccount(id: string) {
    // If we have the account in the service state, use it. Otherwise, fetch it.
    const account = this.accountService.getAccountById(id);
    if (account) {
      this.form.patchValue({
        name: account.name,
        type: account.type,
        initial_balance: account.initial_balance,
        currency: account.currency,
        color: account.color,
        icon: account.icon,
      });
    } else {
      // Fallback to fetch if not found locally (e.g. reload on edit page)
      // Since getAccountById is synchronous from signal, we might need a fetch method in service
      // For now, let's trigger a load if accounts are empty, or navigate back
      if (this.accountService.accounts().length === 0) {
        this.accountService.loadAccounts();
        // This is a naive implementation, ideally we have a getById in service that returns observable
      } else {
        this.router.navigate(['/accounts']);
      }
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formValue = this.form.getRawValue();
    if (this.isEditMode() && this.accountId()) {
      // For update
      const updateData: Dto_UpdateAccountRequest = {
        name: formValue.name,
        initial_balance: formValue.initial_balance,
        color: formValue.color,
        icon: formValue.icon,
      };

      this.accountService.updateAccount(this.accountId()!, updateData).subscribe({
        next: () => this.router.navigate(['/accounts']),
        error: (error) => {
          console.error('Error updating account:', error);
          this.toastService.error('Failed to update account. Please try again.');
        },
      });
    } else {
      // For create
      const createData: Dto_CreateAccountRequest = {
        name: formValue.name,
        type: formValue.type,
        initial_balance: formValue.initial_balance,
        currency: formValue.currency,
        color: formValue.color,
        icon: formValue.icon,
      };

      this.accountService.createAccount(createData).subscribe({
        next: () => {
          this.router.navigate(['/accounts']);
        },
        error: (error) => {
          console.error('Error creating account:', error);
          this.toastService.error('Failed to create account. Please try again.');
        },
      });
    }
  }
}
