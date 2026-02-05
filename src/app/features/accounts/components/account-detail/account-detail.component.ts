import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccountService } from '../../../../core/services/account.service';
import { Dto_AccountResponse } from '../../../../../api/providers';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailComponent implements OnInit {
  private readonly accountService = inject(AccountService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly account = signal<Dto_AccountResponse | null>(null);
  readonly loading = this.accountService.loading;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        take(1),
      )
      .subscribe((id) => {
        if (id) {
          const acc = this.accountService.getAccountById(id);
          if (acc) {
            this.account.set(acc);
          } else {
            // If not found in memory, try loading all (simple approach) or redirect
            if (this.accountService.accounts().length === 0) {
              this.accountService.loadAccounts();
              // Watch for updates - ideally need a better reactive pattern here
              // For now, let's redirect to list if simple lookup fails
              this.router.navigate(['/accounts']);
            } else {
              this.router.navigate(['/accounts']);
            }
          }
        }
      });
  }

  deleteAccount() {
    const acc = this.account();
    if (acc && window.confirm(`Are you sure you want to delete ${acc.name}?`)) {
      this.accountService.deleteAccount(acc.id!).subscribe({
        next: () => this.router.navigate(['/accounts']),
      });
    }
  }
}
