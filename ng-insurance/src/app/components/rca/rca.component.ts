import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category/category';
import {CategoryService} from '../../service/category/category.service';
import {OrderService} from '../../service/order/order.service';
import {Order} from '../../model/order/order';
import {RightOfPossesion} from '../../model/right-of-possession/right-of-possesion.enum';
import {OrderViewModel} from '../../model/order/orderViewModel';

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
  calculated = false;
  activeTab = 'calculator';
  rightOfPossesionList = Object.values(RightOfPossesion);
  order: OrderViewModel = {
    properties: [],
    docNumber: '',
    licensePlateNumber: '',
    idnp: '',
    firstName: '',
    lastName: '',
    rightOfPossesion: ''
  };

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.getAllCategories();
    this.selectedProperties = new Map();
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
          for (let j = category.properties.length - 1; j >= 0; j--) {
            if (category.properties[j].status === 'DELETED') {
                category.properties.splice(j, 1);
            }
          }
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

  getPrice() {
    const order: Order = this.arrToOrder(this.selectedProperties);
    this.orderService.priceOrder(order).subscribe(res => {
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
      this.nextIndex++;
      this.visible = false;
    } else {
      this.visible = true;
    }

  }

  postOrder() {
    this.order.properties = this.arrToOrder(this.selectedProperties).properties;
    this.orderService.postOrder(this.order).subscribe(
      result => {},
      error => {
        alert('Error while adding new order!');
      }
    );
  }
}
