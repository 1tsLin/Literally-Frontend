import { v4 as uuid } from 'uuid';
import { BookFormatEnum } from '../enums/book-format.enum';
import { BookAudienceEnum } from '../enums/book-audience.enum';
import { BookGenreEnum } from '../enums/book-genre.enum';
import { LanguageEnum } from '../enums/language.enum';

export interface Serie {
  id: string;
  alias?: String[];
  format: BookFormatEnum;
  audience: BookAudienceEnum;
  genres: BookGenreEnum[];
  language: LanguageEnum;
  name: String;
  description: String;
}
