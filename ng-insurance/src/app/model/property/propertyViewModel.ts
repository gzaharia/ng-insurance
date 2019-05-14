import {Category} from '../category/category';

export interface PropertyViewModel {
  id: number;
  title: string;
  coefficient: number;
  category: Category;
}
