import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../service/user/user.service';
import {EmployeeViewModel} from '../../../../model/employee/employee-view-model';
import {ActivatedRoute} from '@angular/router';
import {RoleViewModel} from '../../../../model/role/role-view-model';
import {RoleService} from '../../../../service/role/role.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  private user: EmployeeViewModel;
  private roles: RoleViewModel[] = [];

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private route: ActivatedRoute
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

  updateEmployee()
  {
    this.userService.updateEmployee(this.user.id, this.user).subscribe(
      result => {
        location.reload();
      },
      error => {
        alert('Could not update employee!');
      }
    );
  }
}
