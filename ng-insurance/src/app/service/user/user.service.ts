import {Injectable} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EmployeeViewModel} from '../../model/employee/employee-view-model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  GET_ALL_USERS_URL = `${ApiService.BASE_URL}\\admin\\users`;
  GET_ONE_USER_BY_ID = `${ApiService.BASE_URL}\\admin\\users\\`;
  GET_ONE_USER_BY_USERNAME = `${ApiService.BASE_URL}\\admin\\users\\name\\`;
  POST_USER = `${ApiService.BASE_URL}\\admin\\users\\add`;
  PUT_USER_URL = `${ApiService.BASE_URL}\\admin\\users\\edit\\`;
  DELETE_USER_URL = `${ApiService.BASE_URL}\\admin\\users\\delete\\`;

  constructor(public http: HttpClient) {
  }

  getAllUsers(): Observable<EmployeeViewModel[]> {
    return this.http.get<EmployeeViewModel[]>(this.GET_ALL_USERS_URL).pipe(
      map((res: EmployeeViewModel[]) => res)
    );
  }

  getOneUserById(id: number): Observable<EmployeeViewModel> {
    return this.http.get<EmployeeViewModel>(this.GET_ONE_USER_BY_ID + id);
  }

  getOneUserByUsername(username: string): Observable<EmployeeViewModel> {
    return this.http.get<EmployeeViewModel>(this.GET_ONE_USER_BY_USERNAME + username);
  }

  addUser(employee: EmployeeViewModel): Observable<any> {
    return this.http.post(this.POST_USER, employee);
  }

  updateEmployee(id: number, employee: EmployeeViewModel): Observable<any> {
    return this.http.put(this.PUT_USER_URL + id, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.DELETE_USER_URL + id);
  }
}
