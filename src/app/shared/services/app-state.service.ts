import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from '../enums/language.enum';
import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private _language = signal<LanguageEnum>(LanguageEnum.FRENCH);
  language = this._language.asReadonly();

  private readonly LANG_MAP: Record<LanguageEnum, string> = {
    [LanguageEnum.FRENCH]: 'fr',
    [LanguageEnum.ENGLISH]: 'en',
  };

  constructor(private translate: TranslateService) {
    effect(() => {
      this.translate.use(this.LANG_MAP[this._language()]);
    });
  }

  setLanguage(lang: LanguageEnum) {
    this._language.set(lang);
  }
}
