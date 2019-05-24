import { CategoryProperties } from '../category-properties/category-properties';

export interface Category {
  id: number;
  title: string;
  properties: CategoryProperties[];
  status: string;
  deleted: boolean;
  insuranceTitle: string;
}
