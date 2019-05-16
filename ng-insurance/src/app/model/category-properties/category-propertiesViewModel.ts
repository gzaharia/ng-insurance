import {Category} from '../category/category';

export interface CategoryPropertiesViewModel {
  id: number;
  title: string;
  coefficient: number;
  category: Category;
  status: number;
}
