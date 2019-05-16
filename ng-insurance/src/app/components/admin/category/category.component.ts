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

  title: string = '';
  categories: Category[];
  category: CategoryViewModel = <any>{};
  error : string = '';

  constructor(private categoryService: CategoryService, private router : Router) { }

  myEvent(){
    this.category.title =this.title;
    this.category.status = 1;
    this.addNewCategory(this.category);
    this.title ='';
  }

  edit(id){
    this.router.navigateByUrl('admin/category/' + id);
  }

  delete(id){
    this.categories[id].status = 2;
    this.categoryService.updateCategory(this.categories[id].id, this.categories[id]).subscribe(res => {
      alert('Delete PASS');
       location.reload();
    }, err => {
      alert('Delete FAIL');
    });
  }

  ngOnInit() {
    this.getAllCategories();
  }

  addNewCategory(category) {
    category.status = 1;
    if(this.title.trim().length){
      this.categoryService.postCategory(category).subscribe(respon => {
          this.categories.push(respon);
        },
        error => {
          alert("cannot execute!");
        });
    }
    else {
      this.error = 'You have nothing to add !';
      this.clearError();
    }


  }

  clearError(){
    document.getElementById("Error").style.display="block";
    setTimeout(function(){
      document.getElementById("Error").style.display="none"},3000);
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      result => {
        this.categories = result;
        for(let i = 0; i < this.categories.length; i++){
          console.log(this.categories[i].status);
            if (this.categories[i].status == 2){
              this.categories[i].deleted = true;
            }else{
              this.categories[i].deleted = false;
            } 
        }
      },
      err => {
        alert('Could not fetch categories!');
      }
    );
  }
}
