import { Component, OnInit } from '@angular/core';
import {Category} from '../../model/category/category';
import { CategoryViewModel } from '../../model/category/CategoryViewModel';
import {CategoryService} from '../../service/category/category.service';
import {Property} from '../../model/property/property';

@Component({
  selector: 'app-main',
  templateUrl: './rca.component.html',
  styleUrls: ['./rca.component.css']
})

export class RcaComponent implements OnInit {
  model: CategoryViewModel = <any>{};
  categories: Category[];
  public visible = false;
  public showFlag = true;
  activeCategories: Category[] = [];
  category: Category;
  selectedProperties: Property[] = [];
  nextIndex = 1;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      result => {
        this.categories = result;
        if (result[0]) {
          this.activeCategories.push(result[0]);
        }
      },
      err => {
        alert('Could not fetch categories!');
      }
    );
  }
  createOrder() {
    console.log(this.selectedProperties);
  }
  nextElement(event: Event, i, pId) {
    this.selectedProperties.push(this.categories[i].properties[pId]);
    if (i < this.nextIndex - 1) {
      for (let x = 0; x < (this.nextIndex - i); x++) {
        this.activeCategories.pop();
        this.selectedProperties.pop();
        console.log('pop');
      }
      this.nextIndex = i;
    }
    if (this.categories[this.nextIndex]) {
      this.activeCategories.push(this.categories[this.nextIndex]);
      console.log('push');
      this.nextIndex ++;
      this.visible = false;
    } else {
      this.visible = true;
    }

    }
}
