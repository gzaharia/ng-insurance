import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category/category';
import { CategoryService } from 'src/app/service/category/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryPropertiesService } from 'src/app/service/category-properties/category-properties.service';
import { CategoryProperties } from 'src/app/model/category-properties/category-properties';
import {Location} from '@angular/common';

@Component({
  selector: 'app-property',
  templateUrl: './category-properties.component.html',
  styleUrls: ['./category-properties.component.css']
})
export class CategoryPropertiesComponent implements OnInit {


  title = '';
  coefficient: number;
  category: Category = {} as any ;
  property: CategoryProperties = {} as any;
  error = '';
  succes = '';
  initialValue = this.category.title;
  updateFlag : boolean = false;

  constructor(private categoryService: CategoryService, private propertyService: CategoryPropertiesService,
              private route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.title = '';
    this.coefficient = null;
    this.categoryService.getOneCategory(+this.route.snapshot.paramMap.get('id')).subscribe(result => {
      this.category = result;
     if (this.category.status === 'DELETED'){
       this.category.deleted = true;
     }
      for(let i = 0; i < this.category.properties.length; i++){
          if (this.category.properties[i].status === 'DELETED'){

            this.category.properties[i].deleted = true;
          } else {
            this.category.properties[i].deleted = false;
          }
      }
    }, error => {
      alert('Error to read category');

    });
  }

  updCategory() {
    console.log(this.category.title);
    if (this.updateFlag && this.category.title.trim().length) {
      this.categoryService.updateCategory(this.category.id, this.category).subscribe(res => {
        this.getCategory();
        this.updateFlag = false;
        this.successAlert();
      }, err => {
        alert('false');
      });
    } else {
      this.clearError();
    }
  }

  clearError() {
    this.error = 'You have nothing to update !';
    document.getElementById('Error').style.display = 'block';
    setTimeout(function() {
    document.getElementById('Error').style.display = 'none'; }, 3000);
  }

  successAlert() {
    if(this.category.title.trim().length && this.category.title !== this.initialValue) {
      this.succes = 'Updated successfully !';
      document.getElementById('Success').style.display = 'block';
      setTimeout(function() {
      document.getElementById('Success').style.display = 'none'; }, 3000); }
  }
  onChangeCategory() {
    this.updateFlag = true;
  }

  updStatus(status) {
    this.category.status = status;
    this.updateFlag = true;
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
