import { Injectable } from '@angular/core';
import {ApiService} from "../shared/api.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {CategoryPropertiesViewModel} from '../../model/category-properties/category-propertiesViewModel';
import {Order} from "../../model/order/order";
import {OrderViewModel} from "../../model/order/orderViewModel";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private POST_ORDER = `${ApiService.BASE_URL}\\orders\\add`;
  private PRICE_ORDER = `${ApiService.BASE_URL}\\orders\\price`;


  constructor(private http: HttpClient) { }
  priceOrder(order: Order): Observable<any> {
    return this.http.post(this.PRICE_ORDER, order);
  }

  postOrder(order: OrderViewModel): Observable<any> {
    return this.http.post(this.POST_ORDER, order);
  }


}
