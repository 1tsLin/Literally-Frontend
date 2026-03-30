import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { SectionHeaderComponent } from '../../section-header/section-header.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { authors, editors, illustrators, series } from '../../../dummy-data';
import { CommonModule } from '@angular/common';
import { BookFormatEnum } from '../../../enums/book-format.enum';
import { BookAudienceEnum } from '../../../enums/book-audience.enum';
import { BookGenreEnum } from '../../../enums/book-genre.enum';
import { LanguageEnum } from '../../../enums/language.enum';
import { ProductLocalization } from '../../../interfaces/product-localization.model';

@Component({
  selector: 'app-product-configuration',
  imports: [
    ReactiveFormsModule,
    SectionHeaderComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './product-configuration.component.html',
  styleUrl: './product-configuration.component.css',
})
export class ProductConfigurationComponent {
  bookFormats = Object.values(BookFormatEnum);
  bookAudiences = Object.values(BookAudienceEnum);
  bookGenres = Object.values(BookGenreEnum);
  languages = Object.values(LanguageEnum);

  id?: string;
  series = series;
  editors = editors;
  authors = authors;
  illustrators = illustrators;

  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  readonly LanguageEnum = LanguageEnum;

  /*-- Section states --*/
  heroTitle: String = '(nouveau produit)';
  isGeneralInfoOpen: boolean = true;
  isCategoryOpen: boolean = true;
  isContributorsOpen: boolean = true;
  isDetailsOpen: boolean = true;
  isLocalizationsOpen: boolean = true;

  /*-- General information --*/
  coverImageUrl: SafeUrl | string = '/image-placeholder.svg';
  coverImageFile: File | null = null;
  backImageUrl: SafeUrl | string = '/image-placeholder.svg';
  backImageFile: File | null = null;
  selectedSerieId: string | null = null;
  aliases?: string;
  price!: number;
  quantity!: number;

  /*-- Category --*/
  selectedFormat: BookFormatEnum | null = null;
  selectedAudience: BookAudienceEnum | null = null;
  selectedGenres: BookGenreEnum[] = [];
  isGenresSelectorOpen: boolean = false;

  /*-- Contributors --*/
  selectedEditorId: string | null = null;
  selectedAuthorId: string | null = null;
  selectedIllustratorId: string | null = null;

  /*-- Details --*/
  ean?: string;
  pages?: number;
  publicationDate?: Date;
  height?: number;
  width?: number;
  weight?: number;

  /*-- Localizations --*/
  selectedLanguageTab: LanguageEnum = LanguageEnum.FRENCH;
  localizations: ProductLocalization[] = [
    { language: LanguageEnum.FRENCH, name: '', description: '' },
    { language: LanguageEnum.ENGLISH, name: '', description: '' },
  ];

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id') ?? undefined;

    if (this.id) {
      // UPDATE
      this.heroTitle = '(id n° ' + this.id + ')';
    } else {
      // CREATE
    }
  }

  onFileChange(event: Event, isCover: boolean): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    isCover ? (this.coverImageFile = file) : (this.backImageFile = file);

    const objectUrl = URL.createObjectURL(file);
    isCover
      ? (this.coverImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl))
      : (this.backImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl));
  }

  onGenreToggle(genre: BookGenreEnum): void {
    const index = this.selectedGenres.indexOf(genre);
    if (index === -1) {
      this.selectedGenres.push(genre);
    } else {
      this.selectedGenres.splice(index, 1);
    }
  }

  onLanguageToggle(language: LanguageEnum): void {
    this.selectedLanguageTab = language;
  }

  toggleGenre(genre: BookGenreEnum) {
    this.selectedGenres.includes(genre)
      ? (this.selectedGenres = this.selectedGenres.filter(
          (val) => val !== genre,
        ))
      : this.selectedGenres.push(genre);
  }

  get selectedGenresNames(): String {
    return this.selectedGenres.join(', ');
  }

  get currentLocalization(): ProductLocalization {
    return this.localizations.find(
      (l) => l.language === this.selectedLanguageTab,
    )!;
  }
}
