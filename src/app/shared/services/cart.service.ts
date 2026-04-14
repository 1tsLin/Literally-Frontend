import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

export interface CartItem {
  productId: string;
  quantity: number;
}

const CART_KEY = 'cart_items';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _items = signal<CartItem[]>(this.load());

  readonly items = this._items.asReadonly();
  readonly totalItems = computed(() =>
    this._items().reduce((sum, i) => sum + i.quantity, 0),
  );
  readonly itemIds = computed(() => this.items().map((item) => item.productId));

  add(productId: string, quantity = 1): void {
    this._items.update((items) => {
      const existing = items.find((i) => i.productId === productId);

      const updated = existing
        ? items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          )
        : [...items, { productId: productId, quantity }];

      return this.save(updated);
    });
  }

  remove(productId: string): void {
    this._items.update((items) =>
      this.save(items.filter((i) => i.productId !== productId)),
    );
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) return this.remove(productId);

    this._items.update((items) =>
      this.save(
        items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
      ),
    );
  }

  clear(): void {
    this._items.set(this.save([]));
  }

  syncAfterLogin(userId: string, http: HttpClient): Observable<void> {
    const localItems = this._items();

    return http.post<CartItem[]>('/api/cart/sync', { items: localItems }).pipe(
      tap((serverItems) => {
        this._items.set(this.save(serverItems));
      }),
      map(() => void 0),
    );
  }

  private load(): CartItem[] {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private save(items: CartItem[]): CartItem[] {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {}
    return items;
  }
}
