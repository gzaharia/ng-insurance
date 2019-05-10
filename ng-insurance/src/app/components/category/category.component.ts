import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category/category.service';
import { Category } from 'src/app/category/category';
import { CategoryViewModel } from "src/app/model/category/CategoryViewModel";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  title : string;
  categories : Category[];
  category : CategoryViewModel;

  constructor(private categoryService: CategoryService) { }

  myEvent(){
    console.log(this.title);
    this.category = {"title" : this.title};
    this.addNewCategory(this.category);
    this.title ="";
  }

  edit(id){
    console.log("edit : " + id);
  }

  delete(id){
    console.log("delete : " + id);
  }

  ngOnInit() {
    this.getAllCategories();
  }

  addNewCategory(category){
    (this.categoryService.postCategory(category).subscribe(respon=>{
      this.categories.push(respon);
    }, 
    error=>{
      alert("could not save");
    }));
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(
      result => {
        this.categories = result;
      },
      err => {
        alert('Could not fetch categories!');
      }
    );
  }

}
