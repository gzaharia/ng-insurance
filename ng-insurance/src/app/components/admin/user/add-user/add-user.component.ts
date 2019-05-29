import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../service/user/user.service';
import {RoleService} from '../../../../service/role/role.service';
import {Router} from '@angular/router';
import {EmployeeViewModel} from '../../../../model/employee/employee-view-model';
import {RoleViewModel} from '../../../../model/role/role-view-model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: EmployeeViewModel = {
    id: null,
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    roles: [],
    status: null,
  };
  roles: RoleViewModel[] = [];

  constructor(
    public userService: UserService,
    public roleService: RoleService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.roleService.getAllRoles().subscribe(
      result => {
        this.roles = result;

        for (const role of this.roles) {
          if (this.user.roles.includes(role)) {
            role.checked = true;
          }
        }
      },
      error => {
        alert('Could not get user roles!');
      }
    );
  }

  submit() {
    this.userService.addUser(this.user).subscribe(
      result => {
        this.router.navigateByUrl('/admin/users');
      },
      error => {
        alert('Could not add new user!');
      }
    );
  }
}
