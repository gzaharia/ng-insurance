import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {Employee} from '../../../model/employee/employee';
import {UserService} from '../../../service/user/user.service';
import {EmployeeViewModel} from '../../../model/employee/employee-view-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: Employee = {
    id: null,
    username: '',
    password: '',
    roles: [],
    token: ''
  };
  currentUserFromDb: EmployeeViewModel = {
    id: null,
    userName: '',
    firstName: '',
    lastName: '',
    password: '',
    roles: [],
    status: null
  };
  oldUsername: string;

  constructor(
    public auth: AuthenticationService,
    public userService: UserService,
    public router: Router
  ) {
  }

  ngOnInit() {
    if (this.auth.currentUser) {
      this.auth.currentUser.subscribe(x => this.currentUser = x);
      this.userService.getOneUserByUsername(this.currentUser.username).subscribe(
        result => {
          this.currentUserFromDb = result;
        },
        error => {
          alert('Could not find user!');
        });

      this.oldUsername = this.currentUser.username;
    }
  }

  submit() {
    this.userService.updateEmployee(this.currentUserFromDb.id, this.currentUserFromDb).subscribe(
      result => {
        if (this.currentUserFromDb.userName !== this.oldUsername) {
          this.auth.logout();
          this.router.navigateByUrl('/login');
        } else {
          location.reload();
        }
      },
      error => {
        alert('Could not update user!');
      }
    );
  }
}
