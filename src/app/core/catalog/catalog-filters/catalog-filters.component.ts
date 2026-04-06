import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FilterTypeEnum } from '../../../shared/enums/filter-type.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GradeComponent } from '../../../shared/components/grade/grade.component';
import { BookFormatEnum } from '../../../shared/enums/book-format.enum';
import { BookGenreEnum } from '../../../shared/enums/book-genre.enum';
import { BookAudienceEnum } from '../../../shared/enums/book-audience.enum';
import {
  authors,
  editors,
  illustrators,
  series,
} from '../../../shared/dummy-data';
import { CatalogFilter } from '../../../shared/interfaces/catalog-filter.model';
import { ProductService } from '../../../shared/services/product.service';
import { ContributorService } from '../../../shared/services/contributor.service';
import { ContributorCategoryEnum } from '../../../shared/enums/contributor-category.enum';
import { map } from 'rxjs';

@Component({
  selector: 'app-catalog-filters',
  imports: [CommonModule, FormsModule, GradeComponent],
  templateUrl: './catalog-filters.component.html',
  styleUrl: './catalog-filters.component.css',
})
export class CatalogFiltersComponent {
  @Input() filters?: CatalogFilter;
  @Output() filtersChange = new EventEmitter<Partial<CatalogFilter>>();

  readonly FilterTypeEnum = FilterTypeEnum;

  private contributorService = inject(ContributorService);

  filterState: Record<FilterTypeEnum, boolean> = {
    [FilterTypeEnum.PRICE]: false,
    [FilterTypeEnum.SERIE]: false,
    [FilterTypeEnum.GRADE]: false,
    [FilterTypeEnum.FORMAT]: false,
    [FilterTypeEnum.GENRE]: false,
    [FilterTypeEnum.AUDIENCE]: false,
    [FilterTypeEnum.CONTRIBUTOR]: false,
  };
  filterTypes = Object.values(FilterTypeEnum);
  bookFormats = Object.values(BookFormatEnum);
  bookGenres = Object.values(BookGenreEnum);
  bookAudiences = Object.values(BookAudienceEnum);
  series = series;
  editors$ = this.contributorService.getContributors(
    ContributorCategoryEnum.EDITOR,
  );
  authors$ = this.contributorService.getContributors(
    ContributorCategoryEnum.AUTHOR,
  );
  illustrators$ = this.contributorService.getContributors(
    ContributorCategoryEnum.ILLUSTRATOR,
  );

  /*-- Filters values --*/
  selectedFormats: BookFormatEnum[] = [];
  selectedGenres: BookGenreEnum[] = [];
  selectedAudiences: BookAudienceEnum[] = [];

  /*-- Update UI display --*/
  updateFilterUI(type: FilterTypeEnum) {
    this.filterState[type] = !this.filterState[type];
  }

  /*-- Update filters values methods --*/
  toggleFormat(format: BookFormatEnum) {
    this.selectedFormats = this.selectedFormats.includes(format)
      ? this.selectedFormats.filter((f) => f !== format)
      : [...this.selectedFormats, format];
    this.filtersChange.emit({ formats: this.selectedFormats });
  }

  toggleGenre(genre: BookGenreEnum) {
    this.selectedGenres = this.selectedGenres.includes(genre)
      ? this.selectedGenres.filter((f) => f !== genre)
      : [...this.selectedGenres, genre];
    this.filtersChange.emit({ genres: this.selectedGenres });
  }

  toggleAudience(audience: BookAudienceEnum) {
    this.selectedAudiences = this.selectedAudiences.includes(audience)
      ? this.selectedAudiences.filter((f) => f !== audience)
      : [...this.selectedAudiences, audience];
    this.filtersChange.emit({ audiences: this.selectedAudiences });
  }

  /*-- Reset every filters --*/
  removeAllFilter() {
    this.selectedFormats = [];
    this.selectedGenres = [];
    this.selectedAudiences = [];
    this.filtersChange.emit({
      title: undefined,
      price: 150,
      grade: undefined,
      isFavorite: undefined,
      seriesId: undefined,
      authorId: undefined,
      illustratorId: undefined,
      editorId: undefined,
      formats: undefined,
      audiences: undefined,
      genres: undefined,
    });
  }

  /*-- Get filters displayed value --*/
  get hasActiveFilters(): boolean {
    return (
      (!!this.filters?.price && this.filters?.price !== 150) ||
      !!this.filters?.seriesId ||
      !!this.filters?.grade ||
      (!!this.filters?.formats && this.filters.formats.length > 0) ||
      (!!this.filters?.genres && this.filters.genres.length > 0) ||
      (!!this.filters?.audiences && this.filters.audiences.length > 0) ||
      !!this.filters?.editorId ||
      !!this.filters?.authorId ||
      !!this.filters?.illustratorId
    );
  }

  get selectedSeriesName(): String {
    return this.series.find((s) => s.id === this.filters?.seriesId)!.name;
  }

  selectedEditorName$ = this.editors$.pipe(
    map(
      (editors) => editors.find((e) => e.id === this.filters?.editorId)?.name,
    ),
  );

  selectedAuthorName$ = this.authors$.pipe(
    map(
      (authors) => authors.find((e) => e.id === this.filters?.authorId)?.name,
    ),
  );

  selectedIllustratorName$ = this.illustrators$.pipe(
    map(
      (illustrators) =>
        illustrators.find((e) => e.id === this.filters?.illustratorId)?.name,
    ),
  );
}
