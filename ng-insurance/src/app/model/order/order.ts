import {RoleViewModel} from '../role/role-view-model';
import {CategoryPropertiesViewModel} from '../category-properties/category-propertiesViewModel';
import {CategoryPropertiesIdViewModel} from '../category-properties/category-properties-idViewModel';

export interface Order {
  properties: CategoryPropertiesIdViewModel[];
}
