import { CatalogProduct } from './interfaces/catalog-product.model';

export const catalogProducts: CatalogProduct[] = [
  {
    title: 'Runes vol.1 - Les milles visages',
    author: 'Carlos Sanchez',
    grade: 3.9,
    totalReview: 3,
    price: 18,
    isFavorite: false,
    illustration: '/book-cover/runes-vol.1.jpg',
  },
  {
    title: 'Runes vol.2 - Le Labyrinthe',
    author: 'Carlos Sanchez',
    grade: 4.2,
    totalReview: 2,
    price: 16,
    isFavorite: true,
    illustration: '/book-cover/runes-vol.2.jpg',
  },
  {
    title: 'Mon amie fantome vol.1 - Première rencontre',
    author: 'Michelle Tolo',
    grade: 5,
    totalReview: 1,
    price: 13.95,
    isFavorite: false,
    illustration: '/book-cover/mon-amie-fantome-vol.1.jpg',
  },
];
