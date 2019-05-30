import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {OrderService} from '../../service/order/order.service';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardResolverService implements Resolve<any> {

  constructor(
    public orderService: OrderService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return forkJoin([
      this.orderService.getPendingOrders(),
      this.orderService.getApprovedOrders(),
      this.orderService.getDeclinedOrders()
    ]).pipe(map(result => {
      return {
        pending: result[0],
        approved: result[1],
        declined: result[2]
      };
    }));
  }
}
