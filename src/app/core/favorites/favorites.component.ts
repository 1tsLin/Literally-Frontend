import { Component, inject } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { AppStateService } from '../../shared/services/app-state.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, switchMap } from 'rxjs';
import { FavoriteProductComponent } from './favorite-product/favorite-product.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../shared/services/favorite.service';

@Component({
  selector: 'app-favorites',
  imports: [FavoriteProductComponent, TranslateModule, CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  private productService = inject(ProductService);
  private appState = inject(AppStateService);
  private favoriteService = inject(FavoriteService);

  hightlightProducts$ = combineLatest([
    toObservable(this.favoriteService.itemIds),
    toObservable(this.appState.language),
  ]).pipe(
    switchMap(([ids, lang]) =>
      this.productService.getCatalog(lang, { productIds: ids }),
    ),
  );
}
