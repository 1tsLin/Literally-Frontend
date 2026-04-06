import { Injectable, signal } from '@angular/core';
import { CatalogFilter } from '../interfaces/catalog-filter.model';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class CatalogFilterService {
  filters = signal<CatalogFilter>({
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

  filters$ = toObservable(this.filters);

  updateFilters(partial: Partial<CatalogFilter>) {
    this.filters.update((f) => ({ ...f, ...partial }));
  }
}
