import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category/category';
import {OrderService} from '../../service/order/order.service';
import {Order} from '../../model/order/order';
import {RightOfPossesion} from '../../model/right-of-possession/right-of-possesion.enum';
import {OrderViewModel} from '../../model/order/orderViewModel';
import {InsuranceService} from '../../service/insurance/insurance.service';
import {ActivatedRoute} from '@angular/router';
import {Insurance} from '../../model/insurance/insurance';

@Component({
  selector: 'app-main',
  templateUrl: './insurance-calculator.component.html',
  styleUrls: ['./insurance-calculator.component.css']
})
export class InsuranceCalculatorComponent implements OnInit {
  categories: Category[];
  public visible = false;
  public showFlag = true;
  public priceFlag = false;
  private price: number;
  private insurances: Insurance[] = [];
  private selectedInsuranceName: string;
  private selectedInsurance: Insurance;
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
    private insuranceService: InsuranceService,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getAllCategories();
    this.selectedProperties = new Map();
  }

  getAllCategories() {
    this.insurances = this.route.snapshot.data.insurances;
    this.selectedInsuranceName = this.route.snapshot.paramMap.get('name');

    for (const insurance of this.insurances) {
      if (insurance.title === this.selectedInsuranceName) {
        this.selectedInsurance = insurance;
      }
    }

    this.categories = this.selectedInsurance.categories;
    if (this.categories[0]) {
      this.displayedCategories.push(this.categories[0]);
    }

    for (const category of this.categories) {
      for (let j = category.properties.length - 1; j >= 0; j--) {
        if (category.properties[j].status === 'DELETED') {
            category.properties.splice(j, 1);
        }
      }
    }
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