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

  id : number;
  title : string;

  category : Category;
  properties : Property[];
  
  constructor(private categoryService: CategoryService, private propertyService : PropertyService,private route : ActivatedRoute) {}

  ngOnInit() {
    this.id =  +this.route.snapshot.paramMap.get('id');
    this.categoryService.getOneCategory(this.id).subscribe(result=>{
      this.category = result;
      this.id = result.id;
      this.title = result.title;
      console.log(this.category);
    }, error=>{
      console.log("dsdfsdgsdf");
    });

    // this.propertyService.getAllPropertiesByCategory().subscribe(result => {
    //   this.properties = result;
    // }, error =>{

    // });
  }

}
