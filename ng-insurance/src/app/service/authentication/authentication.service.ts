import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Employee} from '../../model/employee/employee';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from '../shared/api.service';
import {Role} from '../../model/role/role.enum';
import {JwtDecoder} from '../../helpers/jwt-decoder/jwt-decoder';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  currentUserSubject: BehaviorSubject<Employee>;
  currentUser: Observable<Employee>;

  constructor(
    public http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<Employee>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Employee {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${ApiService.BASE_URL}/auth/login`, {username, password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  decode(currentUser: Employee): Employee {
    let decodedUser;

    if (this.currentUser) {
      decodedUser = JwtDecoder.decodeToken(currentUser.token);
    }

    return decodedUser;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  get isAdmin() {
    if (this.currentUser) {
      let user: Employee;
      let decodedUser;
      this.currentUser.subscribe(x => user = x);
      decodedUser = JwtDecoder.decodeToken(user.token);
      return decodedUser.roles.includes(Role.Admin);
    } else {
      return false;
    }
  }
}
