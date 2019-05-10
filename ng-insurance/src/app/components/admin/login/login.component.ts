import {Component, OnInit} from '@angular/core';
import {Employee} from '../../../model/employee/employee';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from "../../../service/authentication/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  employee: Employee = {
    username: '',
    password: ''
  };
  invalidLogin = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: AuthenticationService
  ) {}

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  checkLogin() {
    (this.loginService.authenticate(this.employee.username, this.employee.password).subscribe(
        data => {
          this.router.navigate(['admin']);
          this.invalidLogin = false;
        },
        error => {
          this.invalidLogin = true;
        }
      )
    );
  }
}
