import {RoleViewModel} from '../role/role-view-model';

export interface Employee {
  id: number;
  username: string;
  password?: string;
  roles: RoleViewModel[];
  token?: string;
}
