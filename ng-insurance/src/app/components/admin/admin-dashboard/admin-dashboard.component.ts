import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderFullViewModel} from '../../../model/order/order-full-view-model';

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

  constructor(private activatedRoute: ActivatedRoute) {
    this.config = {
      itemsPerPage: 9,
      currentPage: 1,
      totalItems: this.pendingOrders.length
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  ngOnInit() {
    this.pendingOrders = this.activatedRoute.snapshot.data.orders.pending;
    this.approvedOrders = this.activatedRoute.snapshot.data.orders.approved;
    this.declinedOrders = this.activatedRoute.snapshot.data.orders.declined;
  }
}
