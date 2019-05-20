import {CategoryPropertiesIdViewModel} from "../category-properties/category-properties-idViewModel";

export interface OrderViewModel {
  properties: CategoryPropertiesIdViewModel[];
  docNumber: string;
  licensePlateNumber: string;
  idnp: string;
  firstName: string;
  lastName: string;
  rightOfPossesion: string;
}
