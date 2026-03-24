import { Component, Input } from '@angular/core';
import { GradeComponent } from '../../../shared/components/grade/grade.component';
import { CatalogProduct } from '../../../shared/interfaces/catalog-product.model';

@Component({
  selector: 'app-catalog-product',
  imports: [GradeComponent],
  templateUrl: './catalog-product.component.html',
  styleUrl: './catalog-product.component.css',
})
export class CatalogProductComponent {
  @Input() product!: CatalogProduct;
}
