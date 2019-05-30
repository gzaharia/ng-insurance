import { Component, OnInit } from '@angular/core';
import {InsuranceService} from '../../../../service/insurance/insurance.service';
import {Insurance} from '../../../../model/insurance/insurance';

@Component({
  selector: 'app-base-price',
  templateUrl: './base-price.component.html',
  styleUrls: ['./base-price.component.css']
})
export class BasePriceComponent implements OnInit {
  basePrice: number = null;
  insurances: Insurance[];

  constructor(public insuranceService: InsuranceService) {}

  ngOnInit() {
    this.insuranceService.getAllInsurances().subscribe(
      result => {
        this.insurances = result;
      },
      error => {
        alert('Could not get insurances!');
      }
    );

    this.insuranceService.getOneInsuranceByName('RCA').subscribe(
      result => {
        if (result == null){
        this.basePrice = 400;
        }
        else {
          this.basePrice = result.basePrice;
        }
      },
      error => {
        alert('Could not retrieve base price!');
      }
    );
  }

  updateBasePrice() {
    this.insurances[0].basePrice = this.basePrice;
    this.insuranceService.editOneInsurance(this.insurances[0].id, this.insurances[0]).subscribe(
      result => {},
      error => {
        alert('Could not update base price!');
      }
    );
  }
}
