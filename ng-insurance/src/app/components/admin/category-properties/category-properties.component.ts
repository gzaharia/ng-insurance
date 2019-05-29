import {Component, OnInit} from '@angular/core';
import {Category} from 'src/app/model/category/category';
import {CategoryService} from 'src/app/service/category/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryPropertiesService} from 'src/app/service/category-properties/category-properties.service';
import {Location} from '@angular/common';
import {InsuranceService} from 'src/app/service/insurance/insurance.service';
import {Insurance} from 'src/app/model/insurance/insurance';
import {CategoryPropertiesViewModel} from 'src/app/model/category-properties/category-propertiesViewModel';
import {shortInsurance} from 'src/app/model/insurance/shortInsurance';

@Component({
  selector: 'app-property',
  templateUrl: './category-properties.component.html',
  styleUrls: ['./category-properties.component.css']
})
export class CategoryPropertiesComponent implements OnInit {


  categoryId: number;
  title: string = '';
  coefficient: number;
  insurances: Insurance[] = [];
  insurance: shortInsurance = {
    id: null,
    title: ''
  };
  category: Category = {} as any;
  property: CategoryPropertiesViewModel = {} as any;
  error = '';
  succes = '';
  oldCategory: string;
  oldStatus: string;
  oldInsurance: string;
  insuranceTitle: string = '';
  showSuccesCategory: boolean = true;
  showSuccesProperty: boolean = true;

  constructor(
    public categoryService: CategoryService,
    public propertyService: CategoryPropertiesService,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location,
    public insuranceService: InsuranceService) {
    this.categoryId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getInsurance();
  }

  getInsurance() {
    this.insuranceService.getAllInsurances().subscribe(
      res => {
        this.insurances = res;
        for (const insurance of this.insurances) {
          for (const category of insurance.categories) {
            if (category.id === this.categoryId) {
              this.insurance.id = insurance.id;
              this.insurance.title = insurance.title;
              this.insuranceTitle = insurance.title;
              this.oldInsurance = insurance.title;
              this.category = category;
              this.category['insurance'] = insurance;
              this.oldCategory = category.title;
              this.oldStatus = category.status;
            }
            if (this.category.status === 'DELETED') {
              this.category.deleted = true;
            }
          }
        }
      },
      error => {

      }
    );
  }

  updCategory() {
    if ((this.oldStatus !== this.category.status ||
      this.oldCategory !== this.category.title ||
      this.oldInsurance !== this.insurance.title) && this.category.title.trim().length) {
      this.category['insurance'] = this.insurance;
      this.oldStatus = this.category.status;
      this.oldCategory = this.category.title;
      this.oldInsurance = this.insurance.title;
      this.categoryService.updateCategory(this.category.id, this.category).subscribe(res => {
        this.category = res;
        this.succes = 'Updated successfully !';
        this.successAlert('SuccessCategory');
      }, err => {
        alert('false');
      });
    } else {
      this.showError();
    }
  }

  showError() {
    this.error = 'You have nothing to update !';
    document.getElementById('Error').style.display = 'block';
    setTimeout(function () {
      document.getElementById('Error').style.display = 'none';
    }, 3000);
  }

  successAlert(tagName) {
    if (tagName === 'SuccessCategory') {
      this.showSuccesCategory = false;
      setTimeout(() => {
        this.showSuccesCategory = true;
      }, 3000);
    } else {
      this.showSuccesProperty = false;
      setTimeout(() => {
        this.showSuccesProperty = true;
      }, 3000);
    }

  }

  changeStatus(status) {
    this.category.status = status;
  }

  changeInsurance(insuranceId) {
    this.insuranceTitle = this.insurances[insuranceId].title;
    this.insurance = this.insurances[insuranceId];
  }

  saveProperty() {
    this.property.title = this.title;
    this.property.status = 'ACTIVE';
    this.property.coefficient = this.coefficient;

    this.property.category = {
      id: this.categoryId
    };
    delete (this.property.id);
    if (this.property.title.trim().length && this.property.coefficient >= 1) {
      this.propertyService.postProperty(this.property).subscribe(resp => {
        this.category.properties.push(resp);
        this.title = '';
        this.coefficient = null;
        this.succes = 'Property added successfully!';
        this.successAlert('SuccessProperty');
      }, err => {
        this.error = 'could not save';
        this.clearAddError();
      });
    } else {
      this.error = 'You have nothing to add !';
      this.clearAddError();
    }
  }

  clearAddError() {
    document.getElementById('AddError').style.display = 'block';
    setTimeout(function () {
      document.getElementById('AddError').style.display = 'none';
    }, 3000);
  }

  edit(id) {
    this.router.navigateByUrl('admin/properties/' + id);
  }


  delete(id) {
    this.property.title = this.category.properties[id].title;
    this.property.coefficient = this.category.properties[id].coefficient;
    this.property.category = this.category;
    this.property.status = 'DELETED';
    this.propertyService.deleteProperty(this.category.properties[id].id).subscribe(resp => {
        this.category.properties[id].status = resp.status;
        if (resp.status === 'DELETED') {
          this.category.properties[id].deleted = true;
        }
      }, err => {
        alert('could not save');

      }
    );
  }
}
