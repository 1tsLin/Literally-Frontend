import { Component, inject } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { AppStateService } from '../../shared/services/app-state.service';
import { combineLatest, map, of, shareReplay, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { CartService } from '../../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CartProductComponent } from './cart-product/cart-product.component';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, TranslateModule, CartProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private productService = inject(ProductService);
  private appState = inject(AppStateService);
  private cartService = inject(CartService);

  cartProducts$ = combineLatest([
    toObservable(this.cartService.items),
    toObservable(this.appState.language),
  ]).pipe(
    switchMap(([items, lang]) => {
      if (items.length === 0) return of([]);

      return this.productService
        .getCatalog(lang, { productIds: items.map((i) => i.productId) })
        .pipe(
          map((products) =>
            products.map((product) => ({
              ...product,
              quantity:
                items.find((i) => i.productId === product.productId)
                  ?.quantity ?? 1,
            })),
          ),
        );
    }),
    shareReplay(1),
  );

  totalItems$ = this.cartProducts$.pipe(
    map((products) => products.reduce((sum, p) => sum + p.quantity, 0)),
  );

  totalPrice$ = this.cartProducts$.pipe(
    map((products) =>
      products.reduce((sum, p) => sum + p.price * p.quantity, 0),
    ),
  );

  shippingCost$ = this.totalPrice$.pipe(
    map((total) => Math.round(total * 0.05 * 100) / 100),
  );

  total$ = combineLatest([this.totalPrice$, this.shippingCost$]).pipe(
    map(([total, shipping]) => Math.ceil((total + shipping) * 100) / 100),
  );
}
