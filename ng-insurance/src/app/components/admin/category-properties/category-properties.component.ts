import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category/category';
import { CategoryService } from 'src/app/service/category/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryPropertiesService } from 'src/app/service/category-properties/category-properties.service';
import { CategoryProperties } from 'src/app/model/category-properties/category-properties';
import {Location} from '@angular/common';
import { InsuranceService } from 'src/app/service/insurance/insurance.service';
import { Insurance } from 'src/app/model/insurance/insurance';

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
  insurance: Insurance = {
    id: null,
    title: '',
    basePrice: null,
    status: '',
    deleted: false,
    categories: null
  };
  category: Category = {} as any ;
  property: CategoryProperties = {} as any;
  error = '';
  succes = '';
  oldCategory: string;
  oldStatus: string;
  oldInsurance: string;
  insuranceTitle: string = '';

  constructor(
              private categoryService: CategoryService, 
              private propertyService: CategoryPropertiesService,
              private route: ActivatedRoute, 
              private router: Router, 
              private location: Location, 
              private insuranceService: InsuranceService) {
                this.categoryId = +this.route.snapshot.paramMap.get('id');
              }

  ngOnInit() {
    this.getInsurance();
  }

  getInsurance(){
    this.insuranceService.getAllInsurances().subscribe(
      res => {
        this.insurances = res;
        for(let insurance of this.insurances){
          for (let category of insurance.categories){
            if (category.id === this.categoryId){
              this.insurance = insurance;
              this.insuranceTitle = insurance.title;
              this.oldInsurance = insurance.title;
              this.category = category; 
              this.category['insurance'] = insurance;        
              this.oldCategory = category.title;
              this.oldStatus = category.status;
              console.log(this.category);
              console.log(this.insurance);
            }
            if (this.category.status === 'DELETED'){
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
    console.log(this.category);
    if ((this.oldStatus !== this.category.status || 
          this.oldCategory !== this.category.title || 
          this.oldInsurance !== this.insurance.title) && this.category.title.trim().length) {
        this.category['insurance'] = this.insurance;
        console.log(this.category);
        this.categoryService.updateCategory(this.category.id, this.category).subscribe(res => {
        this.successAlert();
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
    setTimeout(function() {
    document.getElementById('Error').style.display = 'none'; }, 3000);
  }

  successAlert() {
    if((this.oldCategory !== this.category.title || 
      this.oldInsurance !== this.insurance.title || 
      this.oldStatus !== this.category.status) && 
      this.category.title.trim().length) {
      this.succes = 'Updated successfully !';
      document.getElementById('Success').style.display = 'block';
      setTimeout(function() {
      document.getElementById('Success').style.display = 'none'; }, 3000); }
  }
  onChangeCategory() {
    
  }

  changeStatus(status) {
    this.category.status = status;
  }

  changeInsurance(insuranceId){
    this.insuranceTitle = this.insurances[insuranceId].title;
    this.insurance = this.insurances[insuranceId];
    console.log(this.insurance);
  }

  saveProperty() {
    this.property.title = this.title;
    this.property.status = 'ACTIVE';
    this.property.coefficient = this.coefficient;
    this.property.category = this.category;
    if (this.property.title.trim().length && this.property.coefficient >= 1) {
      this.propertyService.postProperty(this.property).subscribe(resp => {
        this.category.properties.push(resp);
        this.title = '';
        this.coefficient = null;
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
    setTimeout(function() {
    document.getElementById('AddError').style.display = 'none'; }, 3000);
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
      if (resp.status==='DELETED'){
        this.category.properties[id].deleted = true;
      }
    }, err => {
        alert('could not save');

    }
    );
  }
}
