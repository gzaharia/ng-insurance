import {Category} from '../category/category';

export interface Property {
  id: number;
  title: string;
  category: Category;
  coefficient: number;
}
