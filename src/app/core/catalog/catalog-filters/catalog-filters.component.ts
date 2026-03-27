import { Component } from '@angular/core';
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

@Component({
  selector: 'app-catalog-filters',
  imports: [CommonModule, FormsModule, GradeComponent],
  templateUrl: './catalog-filters.component.html',
  styleUrl: './catalog-filters.component.css',
})
export class CatalogFiltersComponent {
  readonly FilterTypeEnum = FilterTypeEnum;

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
  editors = editors;
  authors = authors;
  illustrators = illustrators;

  /*-- Filters values --*/
  selectedPrice = 150;
  selectedSerieId: string | null = null;
  selectedGrade?: number;
  selectedFormats = new Set<BookFormatEnum>();
  selectedGenres = new Set<BookGenreEnum>();
  selectedAudiences = new Set<BookAudienceEnum>();
  selectedEditorId: string | null = null;
  selectedAuthorId: string | null = null;
  selectedIllustratorId: string | null = null;

  /*-- Update filters values methods --*/
  updateFilterUI(type: FilterTypeEnum) {
    this.filterState[type] = !this.filterState[type];
  }

  toggleFormat(format: BookFormatEnum) {
    this.selectedFormats.has(format)
      ? this.selectedFormats.delete(format)
      : this.selectedFormats.add(format);
  }

  toggleGenre(genre: BookGenreEnum) {
    this.selectedGenres.has(genre)
      ? this.selectedGenres.delete(genre)
      : this.selectedGenres.add(genre);
  }

  toggleAudience(audience: BookAudienceEnum) {
    this.selectedAudiences.has(audience)
      ? this.selectedAudiences.delete(audience)
      : this.selectedAudiences.add(audience);
  }

  removeAllFilter() {
    this.selectedPrice = 150;
    this.selectedSerieId = null;
    this.selectedGrade = undefined;
    this.selectedFormats.clear();
    this.selectedGenres.clear();
    this.selectedAudiences.clear();
    this.selectedEditorId = null;
    this.selectedAuthorId = null;
    this.selectedIllustratorId = null;
  }

  get hasActiveFilters(): boolean {
    return (
      this.selectedPrice !== 150 ||
      this.selectedSerieId !== null ||
      this.selectedGrade !== undefined ||
      this.selectedFormats.size > 0 ||
      this.selectedGenres.size > 0 ||
      this.selectedAudiences.size > 0 ||
      this.selectedEditorId !== null ||
      this.selectedAuthorId !== null ||
      this.selectedIllustratorId !== null
    );
  }

  get selectedSerieName(): String {
    return this.series.find((s) => s.id === this.selectedSerieId)!.name;
  }

  get selectedEditorName(): String {
    return this.editors.find((e) => e.id === this.selectedEditorId)!.name;
  }

  get selectedAuthorName(): String {
    return this.authors.find((e) => e.id === this.selectedAuthorId)!.name;
  }

  get selectedIllustratorName(): String {
    return this.illustrators.find((e) => e.id === this.selectedIllustratorId)!
      .name;
  }
}
