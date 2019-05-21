import { Component, OnInit } from '@angular/core';
import { InsurancesComponent } from '../insurances/insurances.component';

@Component({
  selector: 'app-insurance-header',
  templateUrl: './insurance-header.component.html',
  styleUrls: ['./insurance-header.component.scss']
})
export class InsuranceHeaderComponent implements OnInit {

  operation: string;
  action: string;
  status: string;

  constructor(private insurance: InsurancesComponent) {
    this.action = this.insurance.action;
    this.operation = this.insurance.operation;
    this.status = this.insurance.getStatus();
   }



  ngOnInit() {
  }

  updStatus(status){
    this.status = status;
  }

}
