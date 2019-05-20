import {Injectable} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Observable} from 'rxjs';
import {Category} from '../../model/category/category';
import { CategoryViewModel } from '../../model/category/CategoryViewModel';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private GET_ALL_CATEGORIES = `${ApiService.BASE_URL}\\categories\/all`;
  private GET_ACTIVE_CATEGORIES = `${ApiService.BASE_URL}\\categories`;
  private GET_ONE_CATEGORY = `${ApiService.BASE_URL}\\categories\/`;
  private POST_CATEGORY = `${ApiService.BASE_URL}\/categories\/add`;
  private UPDATE_CATEGORY = `${ApiService.BASE_URL}\/categories\/edit\/`;
  private DELETE_CATEGORY = `${ApiService.BASE_URL}\/categories\/delete\/`;

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.GET_ALL_CATEGORIES).pipe(
      map((res: Category[]) => res)
    );
  }

  getActiveCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.GET_ACTIVE_CATEGORIES);
  }

  getOneCategory(id: number): Observable<Category> {
    return this.http.get<Category>(this.GET_ONE_CATEGORY + id);
  }

  postCategory(category: CategoryViewModel): Observable<any> {
    return this.http.post(this.POST_CATEGORY, category);
  }

  updateCategory(id: number, category: Category): Observable<any> {
    return this.http.put(this.UPDATE_CATEGORY + id, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(this.DELETE_CATEGORY + id);
  }
}
