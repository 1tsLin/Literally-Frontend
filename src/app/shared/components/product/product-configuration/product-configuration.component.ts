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
import { Product } from '../../../interfaces/product.model';
import { ContributorService } from '../../../services/contributor.service';
import { ContributorCategoryEnum } from '../../../enums/contributor-category.enum';
import { ProductService } from '../../../services/product.service';

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
  product?: Product;

  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);
  private contributorService = inject(ContributorService);
  private productService = inject(ProductService);

  editors$ = this.contributorService.getContributors(
    ContributorCategoryEnum.EDITOR,
  );
  authors$ = this.contributorService.getContributors(
    ContributorCategoryEnum.AUTHOR,
  );
  illustrators$ = this.contributorService.getContributors(
    ContributorCategoryEnum.ILLUSTRATOR,
  );

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
  coverImageFile?: File;
  backImageUrl: SafeUrl | string = '/image-placeholder.svg';
  backImageFile?: File;
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
  ean?: number;
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

  submit() {
    this.product = {
      //serieId: this.selectedSerieId ?? undefined,
      alias: this.aliases ? this.aliases.split(';').map((a) => a.trim()) : [],

      format: this.selectedFormat!,
      audience: this.selectedAudience!,
      genres: this.selectedGenres,

      price: this.price,
      quantity: this.quantity,

      authorId: this.selectedAuthorId ?? undefined,
      editorId: this.selectedEditorId ?? undefined,
      illustratorId: this.selectedIllustratorId ?? undefined,

      ean: this.ean,
      pages: this.pages,
      publishingDate: this.publicationDate,

      height: this.height,
      width: this.width,
      weight: this.weight,

      localizations: this.localizations,
    };
    console.log('test');
    this.productService
      .createProduct(this.product, this.coverImageFile, this.backImageFile)
      .subscribe({
        next: (res) => console.log('OK', res),
        error: (err) => console.error('Erreur', err),
      });
  }
}
