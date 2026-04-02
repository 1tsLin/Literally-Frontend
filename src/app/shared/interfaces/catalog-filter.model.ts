import { v4 as uuid } from 'uuid';
import { BookFormatEnum } from '../enums/book-format.enum';
import { BookAudienceEnum } from '../enums/book-audience.enum';
import { BookGenreEnum } from '../enums/book-genre.enum';

export interface CatalogFilter {
  title?: string;
  price?: number;
  grade?: number;
  isFavorite?: boolean;

  seriesId?: string;

  authorId?: string;
  illustratorId?: string;
  editorId?: string;

  formats?: BookFormatEnum[];
  audiences?: BookAudienceEnum[];
  genres?: BookGenreEnum[];
}
