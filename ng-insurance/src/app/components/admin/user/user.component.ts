import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user/user.service';
import {EmployeeViewModel} from '../../../model/employee/employee-view-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  employees: EmployeeViewModel[];

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.getAllEmployees();
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
