import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Employee} from '../../model/employee/employee';
import {Router} from '@angular/router';
import {InsuranceService} from 'src/app/service/insurance/insurance.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: Employee;
  listOfInsurances = [];

  constructor(
    public auth: AuthenticationService,
    public router: Router,
    public insuranceService: InsuranceService
  ) {
    auth.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.insuranceService.getAllActiveInsurances().subscribe(result => {
      this.listOfInsurances = result;
    }, error => {
      alert('Fail');
    });
  }


  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

  get isAdmin() {
    return this.auth.isAdmin;
  }
}
