import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppStateService } from '../../../shared/services/app-state.service';
import { LanguageEnum } from '../../../shared/enums/language.enum';

@Component({
  selector: 'app-footer',
  imports: [RouterModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly LanguageEnum = LanguageEnum;

  private appState = inject(AppStateService);

  language = this.appState.language;

  changeLanguage(lang: LanguageEnum) {
    this.appState.setLanguage(lang);
  }
}
