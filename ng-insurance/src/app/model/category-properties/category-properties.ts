import {Category} from '../category/category';

export interface CategoryProperties {
  id: number;
  title: string;
  category: Category;
  coefficient: number;
  status: string;
  deleted: boolean;
}
