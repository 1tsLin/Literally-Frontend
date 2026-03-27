import { Component } from '@angular/core';
import { CatalogProductComponent } from './catalog-product/catalog-product.component';
import { catalogProducts } from '../../shared/dummy-data';
import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component';

@Component({
  selector: 'app-catalog',
  imports: [CatalogProductComponent, CatalogFiltersComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent {
  catalogProducts = catalogProducts;
  isAdmin = true;
  displayMobileFilter = false;
}
