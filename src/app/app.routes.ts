import { Routes } from '@angular/router';
import { CatalogComponent } from './core/catalog/catalog.component';
import { ProductConfigurationComponent } from './shared/components/product/product-configuration/product-configuration.component';
import { CartComponent } from './core/cart/cart.component';
import { FavoritesComponent } from './core/favorites/favorites.component';
import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './core/home/home.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AboutComponent } from './core/about/about.component';
import { ProductDetailsComponent } from './shared/components/product/product-details/product-details.component';
import { ErrorComponent } from './core/error/error.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'catalog',
        component: CatalogComponent,
      },
      {
        path: 'products/configuration/:id',
        component: ProductConfigurationComponent,
      },
      {
        path: 'products/configuration',
        component: ProductConfigurationComponent,
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent,
      },
      {
        path: 'product',
        component: ProductDetailsComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'error',
        component: ErrorComponent,
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
];
