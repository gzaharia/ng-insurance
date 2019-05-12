import { PropertyViewModel } from '../property/propertyViewModel';

export interface Category {
  id: number;
  title: string;
  properties: PropertyViewModel[];
}
