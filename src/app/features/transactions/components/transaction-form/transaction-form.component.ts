import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TransactionService } from '../../../../core/services/transaction.service';
import { AccountService } from '../../../../core/services/account.service';
import { CategoryService } from '../../../../core/services/category.service';
import { ToastService } from '../../../../core/services/toast.service';
import {
  Domain_TransactionType,
  Dto_CreateTransactionRequest,
  Dto_UpdateTransactionRequest,
} from '../../../../../api/providers';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-transaction-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly transactionService = inject(TransactionService);
  private readonly accountService = inject(AccountService);
  private readonly categoryService = inject(CategoryService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly loading = this.transactionService.loading;
  readonly isEditMode = signal(false);
  readonly transactionId = signal<string | null>(null);

  readonly accounts = this.accountService.accounts;
  readonly categories = this.categoryService.categories;

  readonly transactionTypes = ['credit', 'debit', 'transfer', 'payment'];

  readonly form = this.fb.nonNullable.group({
    transaction_type: ['debit' as Domain_TransactionType, [Validators.required]],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    from_account_id: ['', [Validators.required]],
    to_account_id: [''],
    category_id: ['', [Validators.required]],
    due_date: ['', [Validators.required]],
    payment_date: [''],
    accrual_month: ['', [Validators.required]],
    comments: [''],
    installments: [1],
    is_recurring: [false],
  });

  ngOnInit(): void {
    this.accountService.loadAccounts();
    this.categoryService.loadCategories();

    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        take(1),
      )
      .subscribe((id) => {
        if (id) {
          this.isEditMode.set(true);
          this.transactionId.set(id);
          this.loadTransaction(id);
        }
      });
  }

  private loadTransaction(id: string) {
    const transaction = this.transactionService.getTransactionById(id);
    if (transaction) {
      this.form.patchValue({
        transaction_type: transaction.transaction_type as Domain_TransactionType,
        amount: transaction.amount,
        from_account_id: transaction.from_account_id,
        to_account_id: transaction.to_account_id,
        category_id: transaction.category_id,
        due_date: transaction.due_date,
        payment_date: transaction.payment_date,
        accrual_month: transaction.accrual_month,
        comments: transaction.comments,
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formValue = this.form.getRawValue();

    if (this.isEditMode() && this.transactionId()) {
      const updateData: Dto_UpdateTransactionRequest = {
        transaction_type: formValue.transaction_type as 'credit' | 'debit' | 'transfer' | 'payment',
        amount: formValue.amount,
        from_account_id: formValue.from_account_id,
        to_account_id: formValue.to_account_id || undefined,
        category_id: formValue.category_id,
        due_date: formValue.due_date,
        payment_date: formValue.payment_date || undefined,
        accrual_month: formValue.accrual_month,
        comments: formValue.comments || undefined,
      };
      this.transactionService.updateTransaction(this.transactionId()!, updateData).subscribe({
        next: () => this.router.navigate(['/transactions']),
        error: (error) => {
          console.error('Error updating transaction:', error);
          this.toastService.error('Failed to update transaction. Please try again.');
        },
      });
    } else {
      const createData: Dto_CreateTransactionRequest = {
        transaction_type: formValue.transaction_type as 'credit' | 'debit' | 'transfer' | 'payment',
        amount: formValue.amount,
        from_account_id: formValue.from_account_id,
        to_account_id: formValue.to_account_id || undefined,
        category_id: formValue.category_id,
        due_date: formValue.due_date,
        payment_date: formValue.payment_date || undefined,
        accrual_month: formValue.accrual_month,
        comments: formValue.comments || undefined,
        installments: formValue.installments > 1 ? formValue.installments : undefined,
        is_recurring: formValue.is_recurring || undefined,
      };
      this.transactionService.createTransaction(createData).subscribe({
        next: () => this.router.navigate(['/transactions']),
        error: (error) => {
          console.error('Error creating transaction:', error);
          this.toastService.error('Failed to create transaction. Please try again.');
        },
      });
    }
  }
}
