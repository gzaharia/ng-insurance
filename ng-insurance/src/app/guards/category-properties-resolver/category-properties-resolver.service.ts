import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Category} from '../../model/category/category';
import {CategoryService} from '../../service/category/category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryPropertiesResolverService implements Resolve<Category[]> {

  constructor(
    public categoryService: CategoryService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
    return this.categoryService.getAllInsuranceCategories();
  }
}
