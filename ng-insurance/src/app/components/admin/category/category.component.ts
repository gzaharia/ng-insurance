import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category/category.service';
import { Category } from 'src/app/model/category/category';
import { CategoryViewModel } from 'src/app/model/category/CategoryViewModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  title : string;
  categories : Category[];
  category : CategoryViewModel = <any>{};

  constructor(private categoryService: CategoryService, private router : Router) { }

  myEvent(){
    this.category.title =this.title;
    this.addNewCategory(this.category);
    this.title ='';
  }

  edit(id){
    this.router.navigateByUrl('admin/category/' + id);
  }

  delete(id){
    this.categoryService.deleteCategory(id).subscribe(res => {
      alert("Delete PASS");
    }, err => {
      alert("Delete FAIL");
    });
    console.log('delete : ' + id);
  }

  ngOnInit() {
    this.getAllCategories();
  }

  addNewCategory(category) {
    this.categoryService.postCategory(category).subscribe(respon => {
      this.categories.push(respon);
    },
    error => {
      alert('could not save');
    });
  }

  getAllCategories() {
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
