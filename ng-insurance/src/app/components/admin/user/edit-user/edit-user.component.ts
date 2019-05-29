import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../service/user/user.service';
import {EmployeeViewModel} from '../../../../model/employee/employee-view-model';
import {ActivatedRoute, Router} from '@angular/router';
import {RoleViewModel} from '../../../../model/role/role-view-model';
import {RoleService} from '../../../../service/role/role.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: EmployeeViewModel;
  roles: RoleViewModel[] = [];

  constructor(
    public userService: UserService,
    public roleService: RoleService,
    public route: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.userService.getOneUserById(+this.route.snapshot.paramMap.get('id')).subscribe(
      result => {
        this.user = result;
      },
      error => {
        alert('Could not receive user!');
      }
    );

    this.roleService.getAllRoles().subscribe(
      result => {
        this.roles = result;

        for (let role of this.roles) {
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

  updateEmployee() {
    const selectedRoles = this.roles.filter((role) => role.checked);
    this.user.roles = selectedRoles;

    this.userService.updateEmployee(this.user.id, this.user).subscribe(
      result => {
        this.router.navigateByUrl('/admin/users');
      },
      error => {
        alert('Could not update employee!');
      }
    );
  }
}
