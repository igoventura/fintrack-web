import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './storage.service';

export type Language = 'en-US' | 'pt-BR';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly storage = inject(StorageService);
  private readonly LANGUAGE_KEY = 'app_language';

  // Signals
  currentLang = signal<Language>('en-US');

  readonly supportedLanguages: { code: Language; label: string }[] = [
    { code: 'en-US', label: 'English (US)' },
    { code: 'pt-BR', label: 'Português (BR)' },
  ];

  constructor() {
    this.initLanguage();
  }

  private initLanguage() {
    this.translate.addLangs(this.supportedLanguages.map((l) => l.code));
    this.translate.setFallbackLang('en-US');

    // Try to get from storage
    const storedLang = this.storage.get<Language>(this.LANGUAGE_KEY);

    if (storedLang && this.isValidLanguage(storedLang)) {
      this.setLanguage(storedLang);
    } else {
      // Try to get from browser
      const browserLang = this.translate.getBrowserCultureLang();
      if (browserLang && this.isValidLanguage(browserLang as Language)) {
        this.setLanguage(browserLang as Language);
      } else {
        this.setLanguage('en-US');
      }
    }
  }

  setLanguage(lang: Language) {
    this.translate.use(lang);
    this.currentLang.set(lang);
    this.storage.set(this.LANGUAGE_KEY, lang);
    document.documentElement.lang = lang;
  }

  private isValidLanguage(lang: string): boolean {
    return this.supportedLanguages.some((l) => l.code === lang);
  }
}
