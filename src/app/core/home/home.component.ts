import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { LanguageEnum } from '../../shared/enums/language.enum';
import { CatalogFilter } from '../../shared/interfaces/catalog-filter.model';
import { CommonModule } from '@angular/common';
import { HightlightProductComponent } from './hightlight-product/hightlight-product.component';
import { BookFormatEnum } from '../../shared/enums/book-format.enum';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HightlightProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private router = inject(Router);
  private productService = inject(ProductService);

  private filters: CatalogFilter = {
    //title: 'Runes',
    formats: [BookFormatEnum.COMIC],
  };

  goToCatalog() {
    this.router.navigate(['/catalog']);
  }

  hightlightProducts$ = this.productService.getCatalog(
    LanguageEnum.FRENCH,
    this.filters,
  );
}
