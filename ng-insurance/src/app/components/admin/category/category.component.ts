import {Component, OnInit} from '@angular/core';
import {CategoryService} from 'src/app/service/category/category.service';
import {CategoryViewModel} from 'src/app/model/category/CategoryViewModel';
import {ActivatedRoute, Router} from '@angular/router';
import {InsuranceService} from 'src/app/service/insurance/insurance.service';
import {Insurance} from 'src/app/model/insurance/insurance';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  title: string = '';
  insurance: Insurance;
  category: CategoryViewModel = <any>{};
  error: string = '';
  id: number = null;
  insuranceTitle: string;
  insuranceBasePrice: number;
  operation: string = "Update";
  action:string = "Update";
  isSuccesVisible: boolean = false;
  succes: string;
  oldInsuranceTitle: string;
  oldBasePrice: number;
  oldStatus : string;

  constructor(
    public insuranceService: InsuranceService,
    public categoryService: CategoryService,
    public router: Router,
    public route: ActivatedRoute) {

    this.id = +this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.insuranceService.getOneInsurance(this.id).subscribe(
      result => {
        this.insurance = result;
        this.insuranceTitle = this.insurance.title;
        this.oldInsuranceTitle = this.insurance.title;
        this.oldBasePrice = this.insurance.basePrice;
        this.oldStatus = this.insurance.status;
        this.insuranceBasePrice = this.insurance.basePrice;
        for(let i = 0; i < this.insurance.categories.length; i++){
            if (this.insurance.categories[i].status===("DELETED")){
              this.insurance.categories[i].deleted = true;
            }else{
              this.insurance.categories[i].deleted = false;
            } 
        }
      },
      err => {
        this.error = ('Could not fetch categories!');
        this.showError('ErrorCategory');
      }
    );
  }

  saveCategory() {
    this.category.title =this.title;
    this.title ='';
    this.category.status = "ACTIVE";
    this.category.insurance = this.insurance;
    if(this.category.title.trim().length){
      this.categoryService.postCategory( this.category).subscribe(respon => {
          this.showSucces('SuccesCategory');
          this.insurance.categories.push(respon);
        },
        error => {
          alert('cannot execute!');
        });
    }
    else {
      this.error = 'You have nothing to add !';
      this.showError('ErrorCategory');
    }
  }

  edit(id){
    this.router.navigateByUrl('admin/category/' + id);
  }

  delete(id){
    this.insurance.categories[id].status = "DELETED";
    this.categoryService.deleteCategory(this.insurance.categories[id].id).subscribe(res => {
      this.insurance.categories[id].deleted = true;
    }, err => {
      alert('Delete FAIL');
    });
  }

  updStatusInsurance(status){
    this.insurance.status = status;
  }

  saveInsurance(){
    if((this.insuranceTitle !== this.oldInsuranceTitle || this.insuranceBasePrice !== this.oldBasePrice || this.oldStatus !== this.insurance.status) && this.insuranceTitle.trim().length > 0 && this.insuranceBasePrice >= 1){
      this.insurance.title = this.insuranceTitle;
      this.insurance.basePrice = this.insuranceBasePrice;
      this.insuranceService.editOneInsurance(this.id, this.insurance).subscribe(res => {
        this.oldInsuranceTitle = this.insurance.title;
        this.oldBasePrice = this.insurance.basePrice;
        this.oldStatus = this.insurance.status;
        this.showSucces('SuccesInsurance');
      }, 
      err => {
        this.error = "You data can't Update !";
        this.showError('ErrorInsurance');
      });
    }else{
      this.error = "You have nothing to Update !";
      this.showError('ErrorInsurance');;
    }
  }

  showError(tagId){
    document.getElementById(tagId).style.display="block";
    setTimeout(function(){
      document.getElementById(tagId).style.display="none"},3000);
  }

  showSucces(tagId){
    document.getElementById(tagId).style.display="block";
    this.succes = "You data have been saved !";
    setTimeout(function(){
      document.getElementById(tagId).style.display="none"},3000);
  }
}
