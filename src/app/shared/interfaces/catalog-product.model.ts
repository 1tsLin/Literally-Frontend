import { v4 as uuid } from 'uuid';

export interface CatalogProduct {
  productId?: typeof uuid;
  title: string;
  authorName: string;
  grade: number;
  reviews: number;
  price: number;
  isFavorite: boolean;
  coverId?: string;
  illustration?: string;
}
