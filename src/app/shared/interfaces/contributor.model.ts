import { ContributorCategoryEnum } from '../enums/contributor-category.enum';

export interface Contributor {
  id: string;
  cateogry: ContributorCategoryEnum;
  name: String;
}
