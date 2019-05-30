import {Component, OnInit} from '@angular/core';
import {Insurance} from 'src/app/model/insurance/insurance';
import {InsuranceService} from 'src/app/service/insurance/insurance.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-insurances',
  templateUrl: './insurances.component.html',
  styleUrls: ['./insurances.component.scss']
})
export class InsurancesComponent implements OnInit {

  insurance: Insurance = {
    id: null,
    title: '',
    status: 'ACTIVE',
    basePrice: null,
    categories: null,
    deleted: false
  };
  status: string = "ACTIVE";
  insurances: Insurance[] = [];
  title: string = '';
  basePrice: number;
  operation: string = 'Add new';
  action: string = 'Add'
  error: string = '';
  succes: string = '';

  constructor(
    public insuranceService: InsuranceService,
    public router: Router) {
  }

  ngOnInit() {
    this.getAllInsurance();
  }

  saveInsurance() {
    if (this.title.trim().length > 0 && +this.basePrice > 0) {
      this.insurance.title = this.title;
      this.insurance.basePrice = this.basePrice;
      this.insuranceService.postInsurance(this.insurance).subscribe(res => {
        this.insurance = res;
        if (this.insurance.status === 'DELETED') {
          this.insurance.deleted = true;
        }
        this.insurances.push(this.insurance);
        this.showSucces();
      }, err => {
        this.showError();
      });
    } else {
      this.showError();
    }
  }

  getAllInsurance() {
    this.insuranceService.getAllInsurances().subscribe(res => {
      this.insurances = res;
      for (let insurance of this.insurances) {
        if (insurance.status === "DELETED") {
          insurance.deleted = true;
        }
      }
    }, err => {
      alert('error');
    });
  }

  deleteInsurance(id) {
    this.insuranceService.deleteInsurance(this.insurances[id].id).subscribe(res => {
        this.insurances[id].deleted = true;
        console.log(this.insurances);
      },
      err => {
        this.showError()
      });

  }

  editInsurance(id) {
    this.router.navigateByUrl('admin/insurance/' + this.insurances[id].id);
  }

  updStatus(status) {
    this.status = status;
    this.insurance.status = status;
  }

  getStatus() {
    return this.status;
  }

  showError() {
    this.error = 'You have nothing to add!';
    document.getElementById('Error').style.display = 'block';
    setTimeout(function () {
      document.getElementById('Error').style.display = 'none';
    }, 3000);
  }

  showSucces() {
    this.succes = 'Insurance successfully added!';
    document.getElementById('Succes').style.display = 'block';
    setTimeout(function () {
      document.getElementById('Succes').style.display = 'none';
    }, 3000);
  }

}
