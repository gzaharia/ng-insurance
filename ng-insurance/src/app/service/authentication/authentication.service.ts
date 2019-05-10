import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Employee} from "../../model/employee/employee";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {
  }

  authenticate(username, password) {
    const headers = new HttpHeaders(
      { Authorization: 'Basic ' + btoa(username + ':' + password) }
      );
    return this.httpClient.post<Employee>('http://localhost:8080/api/admin/login',{ headers }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          return userData;
        }
      )
    );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
  }
}

export class User {
  constructor(
    public status: string,
  ) {}
}
