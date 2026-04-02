import { MediaCategoryEnum } from '../enums/media-category.enum';

export interface Media {
  id?: string;
  entityId?: string;
  category: MediaCategoryEnum;
}
