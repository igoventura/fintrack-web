import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Dashboard Component
 * Main dashboard view (placeholder for now).
 */
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome to FinTrack!</p>
      <p>This is a placeholder dashboard. Future features will be added here.</p>
    </div>
  `,
  styles: `
    .dashboard-container {
      padding: 2rem;

      h1 {
        margin: 0 0 1rem 0;
        font-size: 2rem;
        font-weight: 700;
      }

      p {
        margin: 0 0 0.5rem 0;
        color: var(--mat-sys-on-surface-variant);
      }
    }
  `,
})
export class DashboardComponent {}
