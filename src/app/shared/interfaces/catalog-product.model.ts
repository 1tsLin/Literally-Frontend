export interface CatalogProduct {
  productId: string;
  title: string;
  authorName: string;
  grade: number;
  reviews: number;
  price: number;
  isFavorite: boolean;
  coverId?: string;
  illustration?: string;
}
