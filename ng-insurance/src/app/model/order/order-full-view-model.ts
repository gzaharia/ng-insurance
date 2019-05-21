import {CategoryPropertiesViewModel} from '../category-properties/category-propertiesViewModel';
import {OrderStatus} from '../order-status/order-status.enum';

export interface OrderFullViewModel {
  id: number;
  properties: CategoryPropertiesViewModel[];
  docNumber: string;
  licensePlateNumber: string;
  idnp: string;
  firstName: string;
  lastName: string;
  rightOfPossesion: string;
  status?: OrderStatus;
}
