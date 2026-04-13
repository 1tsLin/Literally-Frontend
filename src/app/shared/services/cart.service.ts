import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

export interface CartItem {
  product_id: string;
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

  add(product_id: string, quantity = 1): void {
    this._items.update((items) => {
      const existing = items.find((i) => i.product_id === product_id);

      const updated = existing
        ? items.map((i) =>
            i.product_id === product_id
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          )
        : [...items, { product_id, quantity }];

      return this.save(updated);
    });
  }

  remove(product_id: string): void {
    this._items.update((items) =>
      this.save(items.filter((i) => i.product_id !== product_id)),
    );
  }

  updateQuantity(product_id: string, quantity: number): void {
    if (quantity <= 0) return this.remove(product_id);

    this._items.update((items) =>
      this.save(
        items.map((i) =>
          i.product_id === product_id ? { ...i, quantity } : i,
        ),
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
