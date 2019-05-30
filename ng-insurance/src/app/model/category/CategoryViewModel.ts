import { Insurance } from '../insurance/insurance';
import {InputTypes} from '../input-types/input-types.enum';

export interface CategoryViewModel {
  id: number;
  title: string;
  status: string;
  insurance: Insurance;
  inputType: InputTypes;
}
