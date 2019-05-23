import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderFullViewModel} from '../../../model/order/order-full-view-model';
import {OrderService} from '../../../service/order/order.service';
import {OrderStatus} from '../../../model/order-status/order-status.enum';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  p1: number;
  p2: number;
  p3: number;
  private pendingOrders: OrderFullViewModel[] = [];
  private approvedOrders: OrderFullViewModel[] = [];
  private declinedOrders: OrderFullViewModel[] = [];
  private orderDetails: OrderFullViewModel = {
    id: null,
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.pendingOrders = this.activatedRoute.snapshot.data.orders.pending;
    this.approvedOrders = this.activatedRoute.snapshot.data.orders.approved;
    this.declinedOrders = this.activatedRoute.snapshot.data.orders.declined;
  }

  getOrderDetails(id: number) {
    this.orderService.getOneOrder(id).subscribe(
      result => {
        this.orderDetails = result;
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

        this.approvedOrders.push(result);
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

        this.declinedOrders.push(result);
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
}
