import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category/category.service';
import { Category } from 'src/app/category/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  title : string;
  categories : Category[];

  constructor(private categoryService: CategoryService) { }

  myEvent(){
    console.log(this.title);
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

  addNewCategory(){
    this.categoryService.postCategory.arguments(this.title);
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
