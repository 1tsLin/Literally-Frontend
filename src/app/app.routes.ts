import { Routes } from '@angular/router';
import { CatalogComponent } from './core/catalog/catalog.component';
import { ProductConfigurationComponent } from './shared/components/product/product-configuration/product-configuration.component';

export const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: 'products/configuration',
    component: ProductConfigurationComponent,
  },
];
