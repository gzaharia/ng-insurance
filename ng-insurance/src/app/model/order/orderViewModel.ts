import {CategoryPropertiesIdViewModel} from '../category-properties/category-properties-idViewModel';
import {Insurance} from '../insurance/insurance';

export interface OrderViewModel {
  properties: CategoryPropertiesIdViewModel[];
  docNumber: string;
  licensePlateNumber: string;
  idnp: string;
  firstName: string;
  lastName: string;
  rightOfPossesion: string;
  email: string;
  phoneNo: string;
  insurance: Insurance;
}
