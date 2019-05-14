import {Injectable} from '@angular/core';
import {ApiService} from './shared/api.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EmployeeViewModel} from '../model/employee/employee-view-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private GET_ALL_USERS_URL = `${ApiService.BASE_URL}\\admin\\users`;
  private POST_USER = `${ApiService.BASE_URL}\\admin\\users\\add`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<EmployeeViewModel[]> {
    return this.http.get<EmployeeViewModel[]>(this.GET_ALL_USERS_URL);
  }

  addUser(employee: EmployeeViewModel): Observable<any> {
    return this.http.post(this.POST_USER, employee);
  }
}
