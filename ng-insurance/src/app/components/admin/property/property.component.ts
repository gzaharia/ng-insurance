import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import { CategoryPropertiesService } from 'src/app/service/category-properties/category-properties.service';
import { CategoryProperties } from 'src/app/model/category-properties/category-properties';
import { Category } from 'src/app/model/category/category';
import { CategoryService } from 'src/app/service/category/category.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  private property: CategoryProperties;
  private categories: Category[] = [];
  private title = '';
  private coefficient: number;
  private status = 1;
  private showCategory = false;
  private selectedCategory = '';
  private id: number;

  constructor(private route: ActivatedRoute, private propertyService: CategoryPropertiesService,
              private categoryService: CategoryService, private _location: Location) {
    this.categories = this.route.snapshot.data.categories;
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getProperty();
  }

  getProperty(){
    this.propertyService.getPropertyById(this.id).subscribe(res => {
      this.property = res;
      console.log(this.property);
      this.title = this.property.title;
      this.coefficient = this.property.coefficient;
      this.status = this.property.status;
      for(let category of this.categories){
        for(let property of category.properties){
          if (property.id == this.id){
            this.selectedCategory = category.title;
            this.property.category = category;
          }
        }
      }
      this.showCategory = true;
    }, 
    err => {
      alert('error');
    });
  }

  updStatus(id){
    this.status = id;
    this.property.status = id;
  }

  updProperty(){
    this.property.coefficient = this.coefficient;
    this.property.title = this.title;
    this.propertyService.putProperty(this.property.id, this.property).subscribe(res => {
      this._location.back();
    },
    err => {
      alert("error");
    } );
  }

  updCategory(id){
    console.log(id);
    this.selectedCategory = this.categories[id].title;
    this.property.category = this.categories[id];
  }
}
