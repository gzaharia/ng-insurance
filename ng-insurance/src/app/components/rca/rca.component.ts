import { Component, OnInit } from '@angular/core';
import {Category} from '../../model/category/category';
import { CategoryViewModel } from '../../model/category/CategoryViewModel';
import {CategoryService} from '../../service/category/category.service';

@Component({
  selector: 'app-main',
  templateUrl: './rca.component.html',
  styleUrls: ['./rca.component.css']
})
export class RcaComponent implements OnInit {
  model: CategoryViewModel = {
    title: ''
  };
  categories: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllCategories();
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