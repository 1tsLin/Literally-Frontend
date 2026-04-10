import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { CatalogFilter } from '../../shared/interfaces/catalog-filter.model';
import { CommonModule } from '@angular/common';
import { HightlightProductComponent } from './hightlight-product/hightlight-product.component';
import { BookFormatEnum } from '../../shared/enums/book-format.enum';
import { AppStateService } from '../../shared/services/app-state.service';
import { TranslateModule } from '@ngx-translate/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HightlightProductComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private router = inject(Router);
  private productService = inject(ProductService);
  private appState = inject(AppStateService);

  private filters: CatalogFilter = {
    //title: 'Runes',
    formats: [BookFormatEnum.COMIC],
  };

  goToCatalog() {
    this.router.navigate(['/catalog']);
  }

  hightlightProducts$ = toObservable(this.appState.language).pipe(
    switchMap((lang) => this.productService.getCatalog(lang, this.filters)),
  );
}
