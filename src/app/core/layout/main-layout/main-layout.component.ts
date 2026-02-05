import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

/**
 * Main Layout Component
 * Responsive app shell containing Sidenav and Toolbar.
 */
@Component({
  selector: 'app-main-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    SidenavComponent,
    ToolbarComponent,
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) === false"
      >
        <div class="sidenav-header">
          <h1 class="logo">FinTrack</h1>
        </div>
        <app-sidenav></app-sidenav>
      </mat-sidenav>
      <mat-sidenav-content [style.margin-left]="(isHandset$ | async) ? '0' : '250px'">
        <app-toolbar (menuClick)="drawer.toggle()"></app-toolbar>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
    .sidenav-container {
      height: 100%;
    }

    .sidenav {
      width: 250px;
      background-color: var(--mat-sys-surface);
      border-right: 1px solid var(--mat-sys-outline-variant);
    }

    .sidenav-header {
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid var(--mat-sys-outline-variant);

      .logo {
        margin: 0;
        font-size: 24px;
        font-weight: 700;
        color: var(--mat-sys-primary);
      }
    }

    .content {
      padding: 24px;
    }
  `,
})
export class MainLayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );
}
