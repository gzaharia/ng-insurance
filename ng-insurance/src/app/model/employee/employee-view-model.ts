import {RoleViewModel} from '../role/role-view-model';

export interface EmployeeViewModel {
  id: number;
  userName: string;
  password?: string;
  firstName: string;
  lastName: string;
  roles: RoleViewModel[];
  status: string;
}
