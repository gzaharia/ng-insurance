import {Injectable} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../../model/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private POST_ORDER = `${ApiService.BASE_URL}\\orders\\price`;

  constructor(private http: HttpClient) { }
  postOrder(order: Order): Observable<any> {
    return this.http.post(this.POST_ORDER, order);
  }
}
