import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category/category';
import { CategoryService } from 'src/app/service/category/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryPropertiesService } from 'src/app/service/category-properties/category-properties.service';
import { CategoryProperties } from 'src/app/model/category-properties/category-properties';

@Component({
  selector: 'app-property',
  templateUrl: './category-properties.component.html',
  styleUrls: ['./category-properties.component.css']
})
export class CategoryPropertiesComponent implements OnInit {


  title = '';
  coefficient: number;

  category: Category =<any>{} ;
  property: CategoryProperties = <any>{};

  constructor(private categoryService: CategoryService, private propertyService: CategoryPropertiesService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getCategory();
    // this.getPropertiesByCategory();
  }

  getCategory() {
    this.categoryService.getOneCategory(+this.route.snapshot.paramMap.get('id')).subscribe(result => {
      this.category = result;
      if (this.category.status == 2) {
        this.category.deleted = true;
      }
      for (let i = 0; i < this.category.properties.length; i++) {
        console.log(this.category.properties[i].status);
        if (this.category.properties[i].status == 2) {
          this.category.properties[i].deleted = true;
        } else {
          this.category.properties[i].deleted = false;
        }
      }

      console.log(this.category);
    }, error => {
      alert('Error to read category');
      console.log(error);
    });
  }

  updCategory() {
    console.log(this.category.title);
    let oldTitle = this.category.title;
    this.categoryService.updateCategory(this.category.id, this.category).subscribe(res => {
      // $(".valid-feedback").toggleClass("show");
      console.log('true');
    }, err => {
     // $(".invalid-feedback").toggleClass("show");
      console.log('false');
    });
  }

  saveProperty() {
    this.property.title = this.title;
    this.property.coefficient = this.coefficient;
    this.property.category = this.category;
    this.propertyService.postProperty(this.property).subscribe(resp => {
      // this.category.properties.push(this.property);
      this.getCategory();
    }, err => {
        alert('could not save');
    });
  }

  delete(id) {
    this.property.title = this.category.properties[id].title;
    this.property.coefficient = this.category.properties[id].coefficient;
    this.property.category = this.category;
    this.property.status = 2;
    this.propertyService.putProperty(this.category.properties[id].id, this.property).subscribe(resp => {
      location.reload();
    }, err => {
        alert('could not save');
    });
  }
}