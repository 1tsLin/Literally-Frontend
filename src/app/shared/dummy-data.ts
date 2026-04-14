import { BookAudienceEnum } from './enums/book-audience.enum';
import { BookFormatEnum } from './enums/book-format.enum';
import { BookGenreEnum } from './enums/book-genre.enum';
import { ContributorCategoryEnum } from './enums/contributor-category.enum';
import { LanguageEnum } from './enums/language.enum';
import { CatalogProduct } from './interfaces/catalog-product.model';
import { Contributor } from './interfaces/contributor.model';
import { Serie } from './interfaces/serie.model';
import { v4 as uuid } from 'uuid';

export const catalogProducts: CatalogProduct[] = [
  {
    productId: '1',
    title: 'Runes vol.1 - Les milles visages',
    authorName: 'Carlos Sanchez',
    grade: 3.9,
    reviews: 3,
    price: 18,
    isFavorite: false,
    illustration: '/book-cover/runes-vol.1.jpg',
  },
  {
    productId: '2',
    title: 'Runes vol.2 - Le Labyrinthe',
    authorName: 'Carlos Sanchez',
    grade: 4.2,
    reviews: 2,
    price: 16,
    isFavorite: true,
    illustration: '/book-cover/runes-vol.2.jpg',
  },
  {
    productId: '3',
    title: 'Mon amie fantome vol.1 - Première rencontre',
    authorName: 'Michelle Tolo',
    grade: 5,
    reviews: 1,
    price: 13.95,
    isFavorite: false,
    illustration: '/book-cover/mon-amie-fantome-vol.1.jpg',
  },
];

export const series: Serie[] = [
  {
    id: '49f60e2f-8fe4-4de8-b17b-1870a97ba0b9',
    format: BookFormatEnum.COMIC,
    audience: BookAudienceEnum.ADULT,
    genres: [BookGenreEnum.ADVENTURE],
    language: LanguageEnum.FRENCH,
    name: 'Une série trop top',
    description: 'Oui oui',
  },
  {
    id: '648e8f97-3b5a-47ae-8ac6-3edd9d1ffb64',
    format: BookFormatEnum.COMIC,
    audience: BookAudienceEnum.ADULT,
    genres: [BookGenreEnum.ADVENTURE],
    language: LanguageEnum.FRENCH,
    name: 'Une autre  collection',
    description: 'Oui oui',
  },
];

export const authors: Contributor[] = [
  {
    id: '3d036c00-a2f4-48c1-b2ea-df22a9d74d14',
    cateogry: ContributorCategoryEnum.AUTHOR,
    name: 'Auteur Test1',
  },
  {
    id: 'd8f7ab21-eca3-48e8-8949-5e428a8d925a',
    cateogry: ContributorCategoryEnum.AUTHOR,
    name: 'Auteur Test2',
  },
];

export const editors: Contributor[] = [
  {
    id: 'cc2efe70-c8e3-4235-92a3-2284bc5216c1',
    cateogry: ContributorCategoryEnum.EDITOR,
    name: 'Editeur Test1',
  },
  {
    id: '24490b0f-d7de-415b-9642-9046f80a31db',
    cateogry: ContributorCategoryEnum.EDITOR,
    name: 'Editeur Test2',
  },
];

export const illustrators: Contributor[] = [
  {
    id: 'bce189ba-ffb1-4982-a15a-fa97251929b1',
    cateogry: ContributorCategoryEnum.ILLUSTRATOR,
    name: 'Illustrateur Test1',
  },
  {
    id: 'd0b1f54b-0f7e-4529-815d-9f974fb27bd0',
    cateogry: ContributorCategoryEnum.ILLUSTRATOR,
    name: 'Illustrateur Test2',
  },
];
