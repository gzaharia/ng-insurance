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
  error: string = '';

  constructor(private categoryService: CategoryService, private propertyService: CategoryPropertiesService, 
    private route: ActivatedRoute, private router : Router) {}

  ngOnInit() {
    this.getCategory();
  }

  getCategory(){
    this.title = '';
    this.coefficient = null;
    this.categoryService.getOneCategory(+this.route.snapshot.paramMap.get('id')).subscribe(result=>{
      this.category = result;
     if (this.category.status==2){
       this.category.deleted = true; 
     }
      for(let i = 0; i < this.category.properties.length; i++){
          if (this.category.properties[i].status == 2){
            this.category.properties[i].deleted = true;
          }else{
            this.category.properties[i].deleted = false;
          } 
      }
    }, error=>{
      alert("Error to read category");
      
    });
  }

  updCategory(){
    console.log(this.category.title);
    var oldTitle = this.category.title;
    if(this.category.title.trim().length) {
      this.categoryService.updateCategory(this.category.id, this.category).subscribe(res => {
        this.getCategory();
      }, err => {
        alert("false");
      })
    }
    else {
      this.error = 'You have nothing to update !';
      this.clearError();
    }
  }

  clearError(){
    document.getElementById("Error").style.display="block";
    setTimeout(function(){
    document.getElementById("Error").style.display="none"},3000);
  }

  updStatus(status){
    this.category.status = status;
  }

  saveProperty(){
    this.property.title = this.title;
    this.property.status = 1;
    this.property.coefficient = this.coefficient;
    this.property.category = this.category;
    if (this.property.title.trim().length && this.property.coefficient >=1) {
      this.propertyService.postProperty(this.property).subscribe(resp => {
        //this.category.properties.push(this.property);
        this.getCategory();
      }, err => {
        alert('could not save');
      })
    }
    else{
      this.error = 'You have nothing to add !';
      this.clearAddError();
    }
  }

  clearAddError(){
    document.getElementById("AddError").style.display="block";
    setTimeout(function(){
    document.getElementById("AddError").style.display="none"},3000);
  }

  edit(id){
    this.router.navigateByUrl('admin/properties/' + id);
  }
  

  delete(id){
    this.property.title = this.category.properties[id].title;
    this.property.coefficient = this.category.properties[id].coefficient;
    this.property.category = this.category;
    this.property.status = 2;
    this.propertyService.putProperty(this.category.properties[id].id, this.property).subscribe(resp => {
      location.reload();
      
    }, err => {
        alert('could not save');
        
    });
    this.getCategory();
  }
}
