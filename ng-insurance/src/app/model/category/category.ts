import { Property } from '../property/property';

export interface Category {
  id: number;
  title: string;
  properties: Property[];
  status: number;
}
