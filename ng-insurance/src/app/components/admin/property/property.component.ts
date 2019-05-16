import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryPropertiesService } from 'src/app/service/category-properties/category-properties.service';
import { CategoryProperties } from 'src/app/model/category-properties/category-properties';
import { Category } from 'src/app/model/category/category';
import { CategoryService } from 'src/app/service/category/category.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  private property: CategoryProperties;
  private categories: Category[] = <any>{};
  private title: string = '';
  private coefficient: number;
  private status: number = 1;
  private showCategory: boolean = false;
  private selectedCategory: string = '';

  constructor(private route: ActivatedRoute, private propertyService: CategoryPropertiesService, 
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.getProperty();
  }

  getProperty(){
    this.propertyService.getPropertyById(+this.route.snapshot.paramMap.get('id')).subscribe(res => {
      this.property = res;
      this.title = this.property.title;
      this.coefficient = this.property.coefficient;
      this.status = this.property.status;
      console.log("property");
      console.log(this.property);
      this.getCategories();
    }, 
    err => {
      alert("error");
    });
    
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
      console.log("categories");
      console.log(this.categories);
      this.showCategory = true;
    }, 
    err => {
      alert("error");
    });
    console.log("categories");
    console.log(this.categories);
  }

  updStatus(id){
    this.property.status = id;
  }

  updProperty(){
    this.propertyService.putProperty(this.property.id, this.property).subscribe(res => {
      this.property = res;
    },
    err => {
      alert("error");
    } );
  }

  updCategory(id){
    console.log("categories");
    console.log(this.categories);
    this.selectedCategory = this.categories[id].title;
  }

}
