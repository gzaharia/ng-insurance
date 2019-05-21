import {Injectable} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../../model/order/order';
import {OrderViewModel} from '../../model/order/orderViewModel';
import {OrderFullViewModel} from '../../model/order/order-full-view-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private POST_ORDER = `${ApiService.BASE_URL}\\orders\\add`;
  private PRICE_ORDER = `${ApiService.BASE_URL}\\orders\\price`;
  private GET_ORDERS = `${ApiService.BASE_URL}\\orders`;
  private GET_PENDING_ORDERS = `${ApiService.BASE_URL}\\orders\\pending`;
  private GET_APPROVED_ORDERS = `${ApiService.BASE_URL}\\orders\\approved`;
  private GET_DECLINED_ORDERS = `${ApiService.BASE_URL}\\orders\\declined`;

  constructor(private http: HttpClient) { }
  priceOrder(order: Order): Observable<any> {
    return this.http.post(this.PRICE_ORDER, order);
  }

  postOrder(order: OrderViewModel): Observable<any> {
    return this.http.post(this.POST_ORDER, order);
  }

  getOrders(): Observable<OrderFullViewModel[]> {
    return this.http.get<OrderFullViewModel[]>(this.GET_ORDERS);
  }

  getPendingOrders(): Observable<OrderFullViewModel[]> {
    return this.http.get<OrderFullViewModel[]>(this.GET_PENDING_ORDERS);
  }

  getApprovedOrders(): Observable<OrderFullViewModel[]> {
    return this.http.get<OrderFullViewModel[]>(this.GET_APPROVED_ORDERS);
  }

  getDeclinedOrders(): Observable<OrderFullViewModel[]> {
    return this.http.get<OrderFullViewModel[]>(this.GET_DECLINED_ORDERS);
  }
}
