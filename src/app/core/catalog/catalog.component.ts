import { Component } from '@angular/core';
import { CatalogProductComponent } from './catalog-product/catalog-product.component';

@Component({
  selector: 'app-catalog',
  imports: [CatalogProductComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent {}
