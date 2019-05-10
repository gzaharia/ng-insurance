import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../../model/employee/employee';
import {ApiService} from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private AUTHENTICATE_URL = `${ApiService.BASE_URL}\\admin\\login`;

  constructor(private http: HttpClient) { }

  authenticate(employee: Employee): Observable<any> {
    return this.http.post(this.AUTHENTICATE_URL, employee);
  }
}
