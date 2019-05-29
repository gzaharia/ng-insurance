import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../shared/api.service';
import {Observable} from 'rxjs';
import {CategoryProperties} from '../../model/category-properties/category-properties';
import {CategoryPropertiesViewModel} from '../../model/category-properties/category-propertiesViewModel';
import {Category} from 'src/app/model/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryPropertiesService {

  GET_PROPERTIES_URL = `${ApiService.BASE_URL}\\properties`;
  GET_PROPERTIES_BY_CATEGORY_URL = `${ApiService.BASE_URL}\\properties`;
  GET_PROPERTY_BY_ID = `${ApiService.BASE_URL}\/properties\/`;
  POST_PROPERTY_URL = `${ApiService.BASE_URL}\\properties\\add`;
  PUT_PROPERTY_URL = `${ApiService.BASE_URL}\/properties\/edit\/`;
  DELETE_PROPERTY_URL = `${ApiService.BASE_URL}\\properties\\delete\\`;

  constructor(public http: HttpClient) {
  }

  getAllProperties(): Observable<CategoryProperties[]> {
    return this.http.get<CategoryProperties[]>(this.GET_PROPERTIES_URL);
  }

  getAllPropertiesByCategory(category: Category): Observable<CategoryProperties[]> {
    return this.http.get<CategoryProperties[]>(this.GET_PROPERTIES_BY_CATEGORY_URL + category);
  }

  getPropertyById(id: number): Observable<CategoryProperties> {
    return this.http.get<CategoryProperties>(this.GET_PROPERTY_BY_ID + id);
  }

  postProperty(property: CategoryPropertiesViewModel): Observable<any> {
    return this.http.post(this.POST_PROPERTY_URL, property);
  }

  putProperty(id: number, property: CategoryPropertiesViewModel): Observable<any> {
    return this.http.put(this.PUT_PROPERTY_URL + id, property);
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete(this.DELETE_PROPERTY_URL + id);
  }
}
