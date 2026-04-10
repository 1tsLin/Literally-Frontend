import { Component, inject, signal } from '@angular/core';
import { CatalogProductComponent } from './catalog-product/catalog-product.component';
import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { CommonModule } from '@angular/common';
import { combineLatest, switchMap } from 'rxjs';
import { CatalogFilterService } from '../../shared/services/catalog-filter.service';
import { TranslateModule } from '@ngx-translate/core';
import { AppStateService } from '../../shared/services/app-state.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-catalog',
  imports: [
    CatalogProductComponent,
    CatalogFiltersComponent,
    RouterLink,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent {
  private productService = inject(ProductService);
  private filterService = inject(CatalogFilterService);
  private appState = inject(AppStateService);

  isAdmin = true;
  displayMobileFilter = false;

  catalogProducts$ = combineLatest([
    toObservable(this.appState.language),
    this.filterService.filters$,
  ]).pipe(
    switchMap(([lang, filters]) =>
      this.productService.getCatalog(lang, filters),
    ),
  );
}
