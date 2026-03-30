import { LanguageEnum } from '../enums/language.enum';

export interface ProductLocalization {
  id?: string;
  language: LanguageEnum;
  name: string;
  description: string;
}
