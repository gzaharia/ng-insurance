import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private userName : string;
  private passwd : string;

  constructor() {
    this.passwd = "fsdfasfasd";
    this.userName = "Gaby"
   }

  ngOnInit() {
  }
  
  loginUser() {
    console.log(this.passwd);
    console.log(this.userName);
  }
}
