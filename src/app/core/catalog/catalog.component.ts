import { Component, inject, signal } from '@angular/core';
import { CatalogProductComponent } from './catalog-product/catalog-product.component';
import { catalogProducts } from '../../shared/dummy-data';
import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { LanguageEnum } from '../../shared/enums/language.enum';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { CatalogFilterService } from '../../shared/services/catalog-filter.service';

@Component({
  selector: 'app-catalog',
  imports: [
    CatalogProductComponent,
    CatalogFiltersComponent,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent {
  private productService = inject(ProductService);
  private filterService = inject(CatalogFilterService);

  catalogProducts = catalogProducts;
  isAdmin = true;
  displayMobileFilter = false;

  catalogProducts$ = this.filterService.filters$.pipe(
    switchMap((filters) =>
      this.productService.getCatalog(LanguageEnum.FRENCH, filters),
    ),
  );
}
