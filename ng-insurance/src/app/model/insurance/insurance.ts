import { Category } from '../category/category';

export interface Insurance {
  id: number;
  title: string;
  basePrice: number;
  status?: string;
  deleted: boolean;
  categories: Category[];
}
