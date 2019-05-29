import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderFullViewModel} from '../../../model/order/order-full-view-model';
import {OrderService} from '../../../service/order/order.service';
import {OrderStatus} from '../../../model/order-status/order-status.enum';
import {Insurance} from '../../../model/insurance/insurance';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  p1: number;
  p2: number;
  p3: number;
  pendingOrders: OrderFullViewModel[] = [];
  approvedOrders: OrderFullViewModel[] = [];
  declinedOrders: OrderFullViewModel[] = [];
  sortingMethod: string;
  orderMethod: string;
  pendingSearchText: string;
  approvedSearchText: string;
  declinedSearchText: string;
  selectedInsurance: Insurance = {
    basePrice: 0,
    categories: [],
    deleted: false,
    id: null,
    status: '',
    title: ''
  };
  orderDetails: OrderFullViewModel = {
    id: 0,
    properties: [],
    docNumber: '',
    licensePlateNumber: '',
    idnp: '',
    firstName: '',
    lastName: '',
    rightOfPossesion: '',
    email: '',
    phoneNo: '',
    status: null,
    insurance: {
      id: null,
      title: '',
      basePrice: null,
      status: '',
      deleted: false,
      categories: []
    },
    time_created: null,
    time_updated: null
  };
  sampleInsurance: Insurance = {
    basePrice: 0,
    categories: [],
    deleted: false,
    id: 0,
    status: '',
    title: ''
  };

  constructor(
    public activatedRoute: ActivatedRoute,
    public orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.pendingOrders = this.activatedRoute.snapshot.data.orders.pending;
    this.approvedOrders = this.activatedRoute.snapshot.data.orders.approved;
    this.declinedOrders = this.activatedRoute.snapshot.data.orders.declined;

    this.pendingOrders.forEach(order => {
      order.insurance = this.sampleInsurance;
    });

    this.approvedOrders.forEach(order => {
      order.insurance = this.sampleInsurance;
    });

    this.declinedOrders.forEach(order => {
      order.insurance = this.sampleInsurance;
    });

    for (const order of this.pendingOrders) {
      this.orderService.getInsurancefromOrder(order.id).subscribe(
        result => {
          order.insurance = result;

          this.orderService.getInsurancefromOrder(order.id).subscribe(
            result1 => {
              order.insurance = result1;
            },
            error => {
            }
          );
        },
        error => {
          alert('Could not get order insurance!');
        }
      );
    }

    for (const order of this.approvedOrders) {
      this.orderService.getInsurancefromOrder(order.id).subscribe(
        result => {
          order.insurance = result;

          this.orderService.getInsurancefromOrder(order.id).subscribe(
            result1 => {
              order.insurance = result1;
            },
            error => {
            }
          );
        },
        error => {
          alert('Could not get order insurance!');
        }
      );
    }

    for (const order of this.declinedOrders) {
      this.orderService.getInsurancefromOrder(order.id).subscribe(
        result => {
          order.insurance = result;

          this.orderService.getInsurancefromOrder(order.id).subscribe(
            result1 => {
              order.insurance = result1;
            },
            error => {
            }
          );
        },
        error => {
          alert('Could not get order insurance!');
        }
      );
    }

    this.pendingOrders.sort((a, b) => new Date(b.time_created).getTime() - new Date(a.time_created).getTime());
    this.approvedOrders.sort((a, b) => new Date(b.time_created).getTime() - new Date(a.time_created).getTime());
    this.declinedOrders.sort((a, b) => new Date(b.time_created).getTime() - new Date(a.time_created).getTime());
  }

  getOrderDetails(id: number) {
    this.orderService.getOneOrder(id).subscribe(
      result => {
        this.orderDetails = result;

        this.orderService.getInsurancefromOrder(this.orderDetails.id).subscribe(
          result1 => {
            this.orderDetails.insurance = result1;
          },
          error => {
            alert('Could not get insurance!');
          }
        );
      },
      error => {
        alert('Could not get order details!');
      }
    );
  }

  approveOrder() {
    this.orderService.updateOrderStatus(this.orderDetails.id, OrderStatus.approved).subscribe(
      result => {
        this.orderDetails = result;

        for (let j = this.pendingOrders.length - 1; j >= 0; j--) {
          if (this.pendingOrders[j].id === result.id) {
            this.pendingOrders.splice(j, 1);
          }
        }

        for (let j = this.declinedOrders.length - 1; j >= 0; j--) {
          if (this.declinedOrders[j].id === result.id) {
            this.declinedOrders.splice(j, 1);
          }
        }

        this.orderService.getInsurancefromOrder(result.id).subscribe(
          result1 => {
            result.insurance = result1;

            this.approvedOrders.push(result);
          },
          error => {
          }
        );
      },
      error => {
        alert('Could not approve order!');
      }
    );
  }

  declineOrder() {
    this.orderService.updateOrderStatus(this.orderDetails.id, OrderStatus.declined).subscribe(
      result => {
        this.orderDetails = result;

        for (let j = this.pendingOrders.length - 1; j >= 0; j--) {
          if (this.pendingOrders[j].id === result.id) {
            this.pendingOrders.splice(j, 1);
          }
        }

        for (let j = this.approvedOrders.length - 1; j >= 0; j--) {
          if (this.approvedOrders[j].id === result.id) {
            this.approvedOrders.splice(j, 1);
          }
        }

        this.orderService.getInsurancefromOrder(result.id).subscribe(
          result1 => {
            result.insurance = result1;

            this.declinedOrders.push(result);
          },
          error => {
          }
        );
      },
      error => {
        alert('Could not decline order!');
      }
    );
  }

  getStatusStyle() {
    if (this.orderDetails.status === OrderStatus.approved) {
      return {color: 'green'};
    }
    if (this.orderDetails.status === OrderStatus.pending) {
      return {color: 'darkorange'};
    } else {
      return {color: 'red'};
    }
  }

  dateSort(orders: OrderFullViewModel[]) {
    if (this.sortingMethod === 'Date') {
      if (this.orderMethod === 'Ascending') {
        orders.sort((a, b) => new Date(a.time_created).getTime() - new Date(b.time_created).getTime());
      } else {
        orders.sort((a, b) => new Date(b.time_created).getTime() - new Date(a.time_created).getTime());
      }
    }
  }
}
