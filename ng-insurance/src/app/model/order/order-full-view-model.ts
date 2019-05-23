import {CategoryPropertiesViewModel} from '../category-properties/category-propertiesViewModel';
import {OrderStatus} from '../order-status/order-status.enum';
import {Insurance} from '../insurance/insurance';

export interface OrderFullViewModel {
  id: number;
  properties: CategoryPropertiesViewModel[];
  docNumber: string;
  licensePlateNumber: string;
  idnp: string;
  firstName: string;
  lastName: string;
  rightOfPossesion: string;
  email: string;
  phoneNo: string;
  status?: OrderStatus;
  insurance: Insurance;
  time_created: Date;
  time_updated: Date;
}
