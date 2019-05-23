import {CategoryPropertiesIdViewModel} from '../category-properties/category-properties-idViewModel';
import {Insurance} from '../insurance/insurance';

export interface Order {
  properties: CategoryPropertiesIdViewModel[];
  insurance: Insurance;
}
