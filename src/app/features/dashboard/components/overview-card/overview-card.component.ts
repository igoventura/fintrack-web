import { Component, Input, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-overview-card',
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="overview-card" [class]="variant">
      <mat-card-content>
        <div class="card-header">
          <div class="icon-container">
            <mat-icon>{{ icon }}</mat-icon>
          </div>
          <span class="title">{{ title }}</span>
        </div>
        <div class="value">
          {{ value | currency: 'BRL' }}
        </div>
        @if (trend) {
          <div class="trend" [class.positive]="trend > 0" [class.negative]="trend < 0">
            <mat-icon>{{ trend > 0 ? 'arrow_upward' : 'arrow_downward' }}</mat-icon>
            <span>{{ trend }}% vs last month</span>
          </div>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .overview-card {
      height: 100%;
      border-radius: 16px;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-2px);
      }

      &.success {
        .icon-container {
          background-color: var(--mat-sys-primary-container);
          color: var(--mat-sys-on-primary-container);
        }
      }

      &.danger {
        .icon-container {
          background-color: var(--mat-sys-error-container);
          color: var(--mat-sys-on-error-container);
        }
      }
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background-color: var(--mat-sys-surface-variant);
      color: var(--mat-sys-on-surface-variant);
    }

    .title {
      font-size: 14px;
      font-weight: 500;
      color: var(--mat-sys-on-surface-variant);
    }

    .value {
      font-size: 24px;
      font-weight: 700;
      color: var(--mat-sys-on-surface);
      margin-bottom: 8px;
    }

    .trend {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;

      &.positive {
        color: var(--mat-sys-primary);
      }
      &.negative {
        color: var(--mat-sys-error);
      }

      mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
    }
  `,
})
export class OverviewCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true, transform: numberAttribute }) value!: number;
  @Input({ required: true }) icon!: string;
  @Input() trend?: number;
  @Input() variant: 'neutral' | 'success' | 'danger' = 'neutral';
}
