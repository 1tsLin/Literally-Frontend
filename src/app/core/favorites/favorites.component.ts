import { Component, inject } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { CatalogFilter } from '../../shared/interfaces/catalog-filter.model';
import { AppStateService } from '../../shared/services/app-state.service';
import { BookFormatEnum } from '../../shared/enums/book-format.enum';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { FavoriteProductComponent } from './favorite-product/favorite-product.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [FavoriteProductComponent, TranslateModule, CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  private productService = inject(ProductService);
  private appState = inject(AppStateService);

  private filters: CatalogFilter = {
    //title: 'Runes',
    formats: [BookFormatEnum.COMIC],
  };

  hightlightProducts$ = toObservable(this.appState.language).pipe(
    switchMap((lang) => this.productService.getCatalog(lang, this.filters)),
  );
}
