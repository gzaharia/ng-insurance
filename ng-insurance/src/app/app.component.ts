import {Component} from '@angular/core';
import {Employee} from './model/employee/employee';
import {Router} from '@angular/router';
import {AuthenticationService} from './service/authentication/authentication.service';
import {Role} from './model/role/role.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: Employee;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.roles.includes(Role.Admin);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
