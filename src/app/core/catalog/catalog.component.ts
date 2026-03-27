import { Component } from '@angular/core';
import { CatalogProductComponent } from './catalog-product/catalog-product.component';
import { catalogProducts } from '../../shared/dummy-data';
import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  imports: [CatalogProductComponent, CatalogFiltersComponent, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent {
  catalogProducts = catalogProducts;
  isAdmin = true;
  displayMobileFilter = false;
}
