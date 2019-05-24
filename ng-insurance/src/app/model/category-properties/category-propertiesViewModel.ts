import {Category} from '../category/category';
import { shortCategory } from '../category/shortCategory';

export interface CategoryPropertiesViewModel {
  id: number;
  title: string;
  coefficient: number;
  category: shortCategory;
  status: string;
}
