import {RoleViewModel} from '../role/role-view-model';

export interface EmployeeViewModel {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  roles: RoleViewModel[];
}
