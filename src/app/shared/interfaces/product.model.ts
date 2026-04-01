import { BookAudienceEnum } from '../enums/book-audience.enum';
import { BookFormatEnum } from '../enums/book-format.enum';
import { BookGenreEnum } from '../enums/book-genre.enum';
import { ProductLocalization } from './product-localization.model';

export interface Product {
  id?: string;
  serieId?: string;
  alias?: string[];

  format: BookFormatEnum;
  audience: BookAudienceEnum;
  genres: BookGenreEnum[];

  price: number;
  quantity: number;
  sales?: number;

  authorId?: string;
  editorId?: string;
  illustratorId?: string;

  ean?: number;
  pages?: number;
  publishingDate?: Date;

  height?: number;
  width?: number;
  weight?: number;

  localizations: ProductLocalization[];
}
