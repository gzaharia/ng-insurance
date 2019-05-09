import {Injectable} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Observable} from 'rxjs';
import {Category, CategoryViewModel} from '../../model/category';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private GET_ALL_CATEGORIES = `${ApiService.BASE_URL}\\categories`;
  private POST_CATEGORY = `${ApiService.BASE_URL}\\categories\\add`;
  private UPDATE_CATEGORY = `${ApiService.BASE_URL}\\categories\\`;
  private DELETE_CATEGORY = `${ApiService.BASE_URL}\\categories\\`;

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.GET_ALL_CATEGORIES);
  }

  postCategory(category: CategoryViewModel): Observable<any> {
    return this.http.post(this.POST_CATEGORY, category);
  }

  updateCategory(id: number, category: CategoryViewModel): Observable<any> {
    return this.http.put(this.UPDATE_CATEGORY + id, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(this.DELETE_CATEGORY + id);
  }
}
