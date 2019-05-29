import {Injectable} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../../model/order/order';
import {OrderViewModel} from '../../model/order/orderViewModel';
import {OrderFullViewModel} from '../../model/order/order-full-view-model';
import {Insurance} from '../../model/insurance/insurance';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  POST_ORDER = `${ApiService.BASE_URL}\\orders\\add`;
  PRICE_ORDER = `${ApiService.BASE_URL}\\orders\\price`;
  GET_ORDERS = `${ApiService.BASE_URL}\\orders`;
  GET_ONE_ORDER = `${ApiService.BASE_URL}\\orders\\`;
  GET_PENDING_ORDERS = `${ApiService.BASE_URL}\\orders\\pending`;
  GET_APPROVED_ORDERS = `${ApiService.BASE_URL}\\orders\\approved`;
  GET_DECLINED_ORDERS = `${ApiService.BASE_URL}\\orders\\declined`;
  UPDATE_ORDER_STATUS = `${ApiService.BASE_URL}\\orders\\edit\\status\\`;
  GET_INSURANCE_FROM_ORDER = `${ApiService.BASE_URL}\\orders\\insurance\\`;

  constructor(public http: HttpClient) {
  }

  priceOrder(order: Order): Observable<any> {
    return this.http.post(this.PRICE_ORDER, order);
  }

  postOrder(order: OrderViewModel): Observable<any> {
    return this.http.post(this.POST_ORDER, order);
  }

  getOrders(): Observable<OrderFullViewModel[]> {
    return this.http.get<OrderFullViewModel[]>(this.GET_ORDERS);
  }

  getOneOrder(id: number): Observable<OrderFullViewModel> {
    return this.http.get<OrderFullViewModel>(this.GET_ONE_ORDER + id);
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

  updateOrderStatus(id: number, status: string): Observable<OrderFullViewModel> {
    return this.http.put<OrderFullViewModel>(this.UPDATE_ORDER_STATUS + id, status);
  }

  getInsurancefromOrder(orderId: number): Observable<Insurance> {
    return this.http.get<Insurance>(this.GET_INSURANCE_FROM_ORDER + orderId);
  }
}
