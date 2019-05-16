import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user/user.service';
import {EmployeeViewModel} from '../../../model/employee/employee-view-model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {Employee} from '../../../model/employee/employee';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private employees: EmployeeViewModel[];
  private currentUser: Employee;

  constructor(
    private userService: UserService,
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.getAllEmployees();
    this.auth.currentUser.subscribe(
      result => {
        this.currentUser = result;
      },
      error => {
        alert('Could not get logged user!');
      }
    );
  }

  ngOnInit() {
  }

  getAllEmployees() {
    this.userService.getAllUsers().subscribe(
      result => {
        this.employees = result;
      },
      error => {
        alert('Could not fetch users!');
      }
    );
  }
}
