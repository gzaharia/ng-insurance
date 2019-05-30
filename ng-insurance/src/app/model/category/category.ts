import { CategoryProperties } from '../category-properties/category-properties';
import {InputTypes} from '../input-types/input-types.enum';

export interface Category {
  id: number;
  title: string;
  properties: CategoryProperties[];
  status: string;
  deleted: boolean;
  insuranceTitle: string;
  inputType: InputTypes;
}
