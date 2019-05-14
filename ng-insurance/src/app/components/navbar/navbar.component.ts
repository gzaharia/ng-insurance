import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Employee} from '../../model/employee/employee';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: Employee;

  constructor(private auth: AuthenticationService) {
    auth.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    window.location.reload();
  }
}
