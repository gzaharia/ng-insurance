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
  employees: EmployeeViewModel[] = [];
  currentUser: Employee = {
    id: null,
    username: '',
    password: '',
    roles: [],
    token: ''
  };

  constructor(
    public userService: UserService,
    public router: Router,
    public auth: AuthenticationService
  ) {
  }

  ngOnInit() {
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

  deleteEmployee(id: number) {
    this.userService.deleteEmployee(id).subscribe(
      result => {
        for (let i = 0; i < this.employees.length; i++) {
          if (this.employees[i].id === id) {
            this.employees.splice(i, 1);
          }
        }
      },
      error => {
        alert('Could not delete employee!');
      }
    );
  }
}
