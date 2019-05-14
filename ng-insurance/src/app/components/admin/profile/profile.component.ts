import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {Employee} from '../../../model/employee/employee';
import {UserService} from '../../../service/user/user.service';
import {EmployeeViewModel} from '../../../model/employee/employee-view-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private currentUser: Employee;
  private currentUserFromDb: EmployeeViewModel;

  constructor(
    private auth: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.auth.currentUser) {
      this.auth.currentUser.subscribe(x => this.currentUser = x);

      this.userService.getOneUserByUsername(this.currentUser.username).subscribe(
        result => {
          this.currentUserFromDb = result;
        },
        error => {
          alert('Could not find user!');
        }
      );
    }
  }

  updateEmployee() {
    this.userService.updateEmployee(this.currentUserFromDb.id, this.currentUserFromDb).subscribe(
      result => {},
      error => {
        alert('Could not update user!');
      }
    );
  }
}
