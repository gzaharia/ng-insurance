import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category/category';
import { CategoryService } from 'src/app/service/category/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/service/property/property.service';
import { Property } from 'src/app/model/property/property';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {


  title : string = "";
  coefficient : number;

  category : Category = <any>{};
  property : Property = <any>{};
  
  constructor(private categoryService: CategoryService, private propertyService : PropertyService,private route : ActivatedRoute) {}

  ngOnInit() {
    this.getCategory();
    //this.getPropertiesByCategory();
  }

  getCategory(){
    this.categoryService.getOneCategory(+this.route.snapshot.paramMap.get('id')).subscribe(result=>{
      this.category = result;
      let prop: Property[] = <any>[];
      for(let i = 0; i < this.category.properties.length; i++){
        console.log(this.category.properties[i].status);
          if (this.category.properties[i].status == 2){
            this.category.properties[i].status = 0;
          }else{
            this.category.properties[i].status = 1;
          } 
      }
     
      console.log(this.category);
    }, error=>{
      alert("Error to read category");
      console.log(error);
    });
  }

  updCategory(){
    console.log(this.category.title);
    var oldTitle = this.category.title;
    this.categoryService.updateCategory(this.category.id, this.category).subscribe(res => {
      //$(".valid-feedback").toggleClass("show");
      console.log("true");
    }, err => {
     // $(".invalid-feedback").toggleClass("show");
      console.log("false");
    });
  }

  saveProperty(){
    this.property.title = this.title;
    this.property.coefficient = this.coefficient;
    this.property.category = this.category;
    this.propertyService.postProperty(this.property).subscribe(resp => {
      //this.category.properties.push(this.property);
      this.getCategory();
    }, err => {
        alert('could not save');
    });
  }

  delete(id){
    this.property.title = this.category.properties[id].title;
    this.property.coefficient = this.category.properties[id].coefficient;
    this.property.category = this.category;
    this.property.status = 2;
    this.propertyService.putProperty(this.category.properties[id].id, this.property).subscribe(resp => {
      //this.category.properties.push(this.property);
      this.getCategory();
    }, err => {
        alert('could not save');
    });
  }
}
