import {Injectable} from '@angular/core';
import {Insurance} from '../../model/insurance/insurance';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {InsuranceService} from '../../service/insurance/insurance.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceCalculatorResolverService implements Resolve<Insurance[]> {

  constructor(
    public insuranceService: InsuranceService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Insurance[]> | Promise<Insurance[]> | Insurance[] {
    return this.insuranceService.getAllActiveInsurances();
  }
}
