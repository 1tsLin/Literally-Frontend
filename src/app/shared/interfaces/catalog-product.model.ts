import { v4 as uuid } from 'uuid';

export interface CatalogProduct {
  id?: typeof uuid;
  title: string;
  author: string;
  grade: number;
  totalReview: number;
  price: number;
  isFavorite: boolean;
  illustration: string;
}
