import { Injectable, signal, computed } from '@angular/core';

export interface FavoriteItem {
  productId: string;
}

const FAVORITES_KEY = 'favorites';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private _items = signal<FavoriteItem[]>(this.load());

  readonly items = this._items.asReadonly();
  readonly totalItems = computed(() => this._items().length);
  readonly itemIds = computed(() => this.items().map((item) => item.productId));

  isInFavorites(productId: string): boolean {
    return this._items().some((i) => i.productId === productId);
  }

  toggle(productId: string): void {
    this.isInFavorites(productId)
      ? this.remove(productId)
      : this.add(productId);
  }

  add(productId: string): void {
    if (this.isInFavorites(productId)) return;

    this._items.update((items) =>
      this.save([...items, { productId: productId }]),
    );
  }

  remove(productId: string): void {
    this._items.update((items) =>
      this.save(items.filter((i) => i.productId !== productId)),
    );
  }

  clear(): void {
    this._items.set(this.save([]));
  }

  private load(): FavoriteItem[] {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private save(items: FavoriteItem[]): FavoriteItem[] {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
    } catch {}
    return items;
  }
}
