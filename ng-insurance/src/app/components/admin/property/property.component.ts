import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category/category';
import { CategoryService } from 'src/app/service/category/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/service/property/property.service';
import { PropertyViewModel } from 'src/app/model/property/propertyViewModel';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  title : string = "";
  coefficient : number;

  category : Category = <any>{};
  property : PropertyViewModel = <any>{};
  
  constructor(private categoryService: CategoryService, private propertyService : PropertyService,private route : ActivatedRoute) {}

  ngOnInit() {
    this.getCategory();
    //this.getPropertiesByCategory();
  }

  getCategory(){
    this.categoryService.getOneCategory(+this.route.snapshot.paramMap.get('id')).subscribe(result=>{
      this.category = result;
    }, error=>{
      alert("Error to read category");
      console.log(error);
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
}
