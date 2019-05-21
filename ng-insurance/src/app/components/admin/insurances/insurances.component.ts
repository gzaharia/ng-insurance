import { Component, OnInit, ɵConsole } from '@angular/core';
import { Insurance } from 'src/app/model/insurance/insurance';
import { InsuranceService } from 'src/app/service/insurance/insurance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurances',
  templateUrl: './insurances.component.html',
  styleUrls: ['./insurances.component.scss']
})
export class InsurancesComponent implements OnInit {

  private insurance: Insurance = {
    id: null,
    title: '',
    status: 'ACTIVE',
    basePrice: null,
    categories: null,
    deleted: false
  };
  private status: string = "ACTIVE";
  private insurances: Insurance[] = [];
  private title: string = '';
  private basePrice: number;
  public operation: string = 'Add new';
  public action: string = 'Add'

  constructor(
    private insuranceService: InsuranceService, 
    private router: Router) {}

  ngOnInit() {
    this.getAllInsurance();
  }

  saveInsurance(){
    console.log(this.insurance);
    this.insurance.title = this.title;
    this.insurance.basePrice = this.basePrice;
    this.insuranceService.postInsurance(this.insurance).subscribe(res =>{
      this.insurance = res;
        if (this.insurance.status === 'DELETED'){
          this.insurance.deleted = true;
        }
        this.insurances.push(this.insurance);
    }, err => {
        alert('don\'t save');
    });
  }

  getAllInsurance(){
    this.insuranceService.getAllInsurances().subscribe(res => {
        this.insurances = res;
        for(let insurance of this.insurances){
          if (insurance.status==="DELETED"){
            insurance.deleted = true;
          }
        }
    }, err => {
      alert('error');
    });
  }

  deleteInsurance(id){
    this.insuranceService.deleteInsurance(this.insurances[id].id).subscribe(res => {
      this.insurances[id].deleted = true;
      console.log(this.insurances);
    },
       err => {
      alert('error');
    });

  }

  editInsurance(id){
    this.router.navigateByUrl('admin/insurance/' + this.insurances[id].id);
  }

  updStatus(status){
    this.status = status;
    this.insurance.status = status;
  }

  getStatus(){
    return this.status;
  }

}
