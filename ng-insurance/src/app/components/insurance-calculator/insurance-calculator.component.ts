import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category/category';
import {OrderService} from '../../service/order/order.service';
import {Order} from '../../model/order/order';
import {RightOfPossesion} from '../../model/right-of-possession/right-of-possesion.enum';
import {OrderViewModel} from '../../model/order/orderViewModel';
import {InsuranceService} from '../../service/insurance/insurance.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Insurance} from '../../model/insurance/insurance';

@Component({
  selector: 'app-main',
  templateUrl: './insurance-calculator.component.html',
  styleUrls: ['./insurance-calculator.component.css']
})
export class InsuranceCalculatorComponent implements OnInit {
  categories: Category[];
  visible = false;
  showFlag = true;
  priceFlag = false;
  price: number;
  insurances: Insurance[] = [];
  selectedInsuranceName: string;
  selectedInsurance: Insurance;
  ordered = false;
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
    rightOfPossesion: '',
    email: '',
    phoneNo: '',
    insurance: null
  };

  constructor(
    public insuranceService: InsuranceService,
    public orderService: OrderService,
    public route: ActivatedRoute,
    public router: Router
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

    for (let i = this.categories.length - 1; i >= 0; i--) {
      if (this.categories[i].status === 'DELETED') {
        this.categories.splice(i, 1);
      } else {
        for (let j = this.categories[i].properties.length - 1; j >= 0; j--) {
          if (this.categories[i].properties[j].status === 'DELETED') {
            this.categories[i].properties.splice(j, 1);
          }
        }
        if (this.categories[i].properties.length === 0) {
          this.categories.splice(i, 1);
        }
      }
    }
    if (this.categories[0]) {
      this.displayedCategories.push(this.categories[0]);
    }
  }

  arrToOrder(map) {
    const order: Order = {
      properties: [],
      insurance: {
        id: null,
        title: '',
        basePrice: null,
        status: '',
        deleted: false,
        categories: []
      }
    };
    map.forEach(value => {
      order.properties.push({id: value.id});
    });
    return order;
  }

  getPrice() {
    const order: Order = this.arrToOrder(this.selectedProperties);
    order.insurance = this.selectedInsurance;
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
    setTimeout(function () {
      window.scrollBy(0, document.body.scrollHeight)
    }, 1);
  }

  postOrder() {
    this.ordered = true;
    this.order.insurance = this.selectedInsurance;
    this.order.properties = this.arrToOrder(this.selectedProperties).properties;

    this.orderService.postOrder(this.order).subscribe(
      () => {
      },
      error => {
        alert('Error while adding new order!');
      },
      () => {
        this.router.navigate(['/'], {queryParams: {success: 'true'}});
      }
    );
  }
}
