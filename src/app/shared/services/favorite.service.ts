import { Injectable, signal, computed } from '@angular/core';

export interface FavoriteItem {
  product_id: string;
}

const FAVORITES_KEY = 'favorites';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private _items = signal<FavoriteItem[]>(this.load());

  readonly items = this._items.asReadonly();
  readonly totalItems = computed(() => this._items().length);
  readonly itemIds = computed(() =>
    this.items().map((item) => item.product_id),
  );

  isInFavorites(product_id: string): boolean {
    return this._items().some((i) => i.product_id === product_id);
  }

  toggle(product_id: string): void {
    this.isInFavorites(product_id)
      ? this.remove(product_id)
      : this.add(product_id);
  }

  add(product_id: string): void {
    if (this.isInFavorites(product_id)) return;

    this._items.update((items) => this.save([...items, { product_id }]));
  }

  remove(product_id: string): void {
    this._items.update((items) =>
      this.save(items.filter((i) => i.product_id !== product_id)),
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
