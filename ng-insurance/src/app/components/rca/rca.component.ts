import { Component, OnInit } from '@angular/core';
import {Category} from '../../model/category/category';
import { CategoryViewModel } from '../../model/category/CategoryViewModel';
import {CategoryService} from '../../service/category/category.service';
import {CategoryProperties} from '../../model/category-properties/category-properties';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {CategoryPropertiesViewModel} from "../../model/category-properties/category-propertiesViewModel";
import {OrderService} from '../../service/order/order.service';
import {Order} from '../../model/order/order';


@Component({
  selector: 'app-main',
  templateUrl: './rca.component.html',
  styleUrls: ['./rca.component.css']
})

export class RcaComponent implements OnInit {
  categories: Category[];
  public visible = false;
  public showFlag = true;
  public priceFlag = false;
  private price: number;
  displayedCategories: Category[] = [];
  category: Category;
  selectedProperties;
  nextIndex = 1;


  constructor(private categoryService: CategoryService, private orderService: OrderService) { }

  ngOnInit() {
    this.getAllCategories();
    this.selectedProperties = new Map();
  }
  sortCategories() {

  }

  getAllCategories() {
    this.categoryService.getActiveCategories().subscribe(
      result => {
        this.categories = result.sort((a, b): number => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });
        for (const category of this.categories) {
          category.properties.sort((a, b): number => {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            return 0;
          });

          for (let j = category.properties.length - 1; j >= 0; j--) {
            if (category.properties[j].status.toString() === 'DELETED') {
                category.properties.splice(j, 1);
            }
          }
          category.properties.filter(function (el) {
            return el != null;
          });

        }
        if (result[0]) {
          this.displayedCategories.push(result[0]);
        }
      },
      err => {
        alert('Could not fetch categories!');
      }
    );
  }
  arrToOrder(map) {
    const order: Order = {
      properties: []
    };
    map.forEach(function (value) {
      order.properties.push({id: value.id});
    });
    return order;
  }
  createOrder() {
    const order: Order = this.arrToOrder(this.selectedProperties);
    this.orderService.postOrder(order).subscribe(res => {
      this.price = res;
      this.priceFlag = true;
    }, error1 => {
        alert('fail');
        this.priceFlag = false;
      });
  }
  nextElement(event: Event, i, pId) {
    this.priceFlag = false;
    this.selectedProperties.set(this.categories[i], this.categories[i].properties[pId]);
    if (i < this.nextIndex - 1) {
      for (let x = 0; x < (this.nextIndex - i); x++) {
        this.displayedCategories.pop();
      }
      this.nextIndex = i;
    }
    if (this.categories[this.nextIndex]) {
      this.displayedCategories.push(this.categories[this.nextIndex]);
      this.nextIndex ++;
      this.visible = false;
    } else {
      this.visible = true;
    }

    }
}
