import { Insurance } from '../insurance/insurance';

export interface CategoryViewModel {
  id: number;
  title: string;
  status: string;
  insurance: Insurance;
}
