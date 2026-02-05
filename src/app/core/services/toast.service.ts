import { Injectable, inject, signal } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Service for displaying toast notifications using Angular Material Snackbar.
 * Supports success, error, warning, and info notification types.
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly snackBar = inject(MatSnackBar);

  // Track active notifications
  private activeNotifications = signal<string[]>([]);

  /**
   * Display a success notification.
   * @param message Message to display
   * @param duration Duration in milliseconds (default: 3000)
   */
  success(message: string, duration = 3000): void {
    this.show(message, 'success', duration);
  }

  /**
   * Display an error notification.
   * @param message Message to display
   * @param duration Duration in milliseconds (default: 5000)
   */
  error(message: string, duration = 5000): void {
    this.show(message, 'error', duration);
  }

  /**
   * Display a warning notification.
   * @param message Message to display
   * @param duration Duration in milliseconds (default: 4000)
   */
  warning(message: string, duration = 4000): void {
    this.show(message, 'warning', duration);
  }

  /**
   * Display an info notification.
   * @param message Message to display
   * @param duration Duration in milliseconds (default: 3000)
   */
  info(message: string, duration = 3000): void {
    this.show(message, 'info', duration);
  }

  /**
   * Display a notification with the specified type.
   * @param message Message to display
   * @param type Notification type
   * @param duration Duration in milliseconds
   */
  private show(message: string, type: ToastType, duration: number): void {
    // Add to active notifications
    this.activeNotifications.update((notifications) => [...notifications, message]);

    const config: MatSnackBarConfig = {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [`toast-${type}`],
    };

    const snackBarRef = this.snackBar.open(message, 'Dismiss', config);

    // Remove from active notifications when dismissed
    snackBarRef.afterDismissed().subscribe(() => {
      this.activeNotifications.update((notifications) =>
        notifications.filter((n) => n !== message),
      );
    });
  }

  /**
   * Get the list of active notifications.
   */
  getActiveNotifications() {
    return this.activeNotifications.asReadonly();
  }
}
