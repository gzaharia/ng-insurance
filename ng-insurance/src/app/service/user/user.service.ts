import {Injectable} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EmployeeViewModel} from '../../model/employee/employee-view-model';
import {Employee} from '../../model/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private GET_ALL_USERS_URL = `${ApiService.BASE_URL}\\admin\\users`;
  private GET_ONE_USER_BY_ID = `${ApiService.BASE_URL}\\admin\\users\\`;
  private GET_ONE_USER_BY_USERNAME = `${ApiService.BASE_URL}\\admin\\users\\name\\`;
  private POST_USER = `${ApiService.BASE_URL}\\admin\\users\\add`;
  private PUT_USER_URL = `${ApiService.BASE_URL}\\admin\\users\\edit\\`;
  private DELETE_USER_URL = `${ApiService.BASE_URL}\\admin\\users\\delete\\`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<EmployeeViewModel[]> {
    return this.http.get<EmployeeViewModel[]>(this.GET_ALL_USERS_URL);
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
