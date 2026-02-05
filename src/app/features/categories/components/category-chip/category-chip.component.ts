import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Dto_CategoryResponse } from '../../../../../api/providers';

@Component({
  selector: 'app-category-chip',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule],
  template: `
    @if (category()) {
      <div
        class="category-chip"
        [style.backgroundColor]="category()!.color + '20'"
        [style.color]="category()!.color"
        [style.borderColor]="category()!.color"
      >
        @if (category()!.icon) {
          <mat-icon [style.color]="category()!.color">{{ category()!.icon }}</mat-icon>
        }
        <span>{{ category()!.name }}</span>
      </div>
    }
  `,
  styles: [
    `
      .category-chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 4px 12px;
        border-radius: 16px;
        font-size: 14px;
        font-weight: 500;
        border: 1px solid transparent;
        line-height: 24px;

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryChipComponent {
  readonly category = input<Dto_CategoryResponse | undefined>(undefined);
}
