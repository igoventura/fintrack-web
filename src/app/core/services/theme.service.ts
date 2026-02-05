import { Injectable, signal, computed, effect } from '@angular/core';
import { StorageService } from './storage.service';

export type Theme = 'light' | 'dark';

/**
 * Service for managing application theme (light/dark mode).
 * Persists theme preference in localStorage and applies to document.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storage = new StorageService();
  private readonly THEME_KEY = 'app_theme';

  // Signal-based theme state
  currentTheme = signal<Theme>('light');

  // Computed signal for dark mode check
  isDarkMode = computed(() => this.currentTheme() === 'dark');

  constructor() {
    // Load theme from storage on initialization
    this.loadTheme();

    // Apply theme whenever it changes
    effect(() => {
      this.applyTheme(this.currentTheme());
    });
  }

  /**
   * Toggle between light and dark themes.
   */
  toggleTheme(): void {
    const newTheme: Theme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Set a specific theme.
   * @param theme Theme to apply ('light' or 'dark')
   */
  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    this.storage.set(this.THEME_KEY, theme);
  }

  /**
   * Load theme from localStorage.
   * Falls back to 'light' if not found.
   */
  private loadTheme(): void {
    const savedTheme = this.storage.get<Theme>(this.THEME_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.currentTheme.set(savedTheme);
    }
  }

  /**
   * Apply theme by adding/removing class on document body.
   * @param theme Theme to apply
   */
  private applyTheme(theme: Theme): void {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
