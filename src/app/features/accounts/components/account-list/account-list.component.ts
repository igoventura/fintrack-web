import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccountService } from '../../../../core/services/account.service';
import { Dto_AccountResponse } from '../../../../../api/providers';

import { AppIconComponent } from '../../../../shared/components/app-icon/app-icon.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state';
import { HeaderComponent } from '../../../../shared/components/header/header';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    AppIconComponent,
    EmptyStateComponent,
    HeaderComponent,
  ],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountListComponent implements OnInit {
  private readonly accountService = inject(AccountService);

  readonly accounts = this.accountService.accounts;
  readonly loading = this.accountService.loading;

  ngOnInit(): void {
    this.accountService.loadAccounts();
  }

  deleteAccount(account: Dto_AccountResponse, event: Event) {
    event.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${account.name}?`)) {
      this.accountService.deleteAccount(account.id!).subscribe();
    }
  }
}
