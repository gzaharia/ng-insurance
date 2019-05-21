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
  config: any;
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
    status: null,
    insurance: null
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.config = {
      itemsPerPage: 9,
      currentPage: 1,
      totalItems: this.pendingOrders.length
    };
  }

  ngOnInit() {
    this.pendingOrders = this.activatedRoute.snapshot.data.orders.pending;
    this.approvedOrders = this.activatedRoute.snapshot.data.orders.approved;
    this.declinedOrders = this.activatedRoute.snapshot.data.orders.declined;

    console.log(this.pendingOrders);
  }

  pageChanged(event) {
    this.config.currentPage = event;
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
