import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ACCOUNT_ICONS, CATEGORY_ICONS } from '../../../core/constants';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  template: `
    <div
      class="icon-container"
      [style.width.px]="size()"
      [style.height.px]="size()"
      [style.background-color]="color() || 'transparent'"
    >
      @if (svgIcon()) {
        <div class="app-icon-svg" [innerHTML]="svgIcon()" matTooltip="{{ _description }}"></div>
      } @else {
        <mat-icon>{{ name() }}</mat-icon>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
      }
      .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: white;
        overflow: hidden;
      }
      .app-icon-svg {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60%;
        height: 60%;
      }
      .app-icon-svg ::ng-deep svg {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
      }
      /* Ensure stroke icons also turn white if needed, 
         though many are 'currentColor' which we set via color: white */
      mat-icon {
        font-size: 1.2rem;
        width: 1.2rem;
        height: 1.2rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIconComponent {
  private readonly sanitizer = inject(DomSanitizer);

  // Inputs
  readonly name = input.required<string>();
  readonly color = input<string>();
  readonly size = input<number>(24);
  public _description = '';

  // Computed
  readonly svgIcon = computed(() => {
    const iconName = this.name();
    const accountIcon = ACCOUNT_ICONS.find((i) => i.name === iconName);
    const categoryIcon = CATEGORY_ICONS.find((i) => i.name === iconName);
    const iconData = accountIcon || categoryIcon;

    if (iconData) {
      this._description = iconData.description;
      return this.sanitizer.bypassSecurityTrustHtml(iconData.icon);
    }
    return null;
  });
}
