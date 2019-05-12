import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../shared/api.service';
import {Observable} from 'rxjs';
import {Property} from '../../model/property/property';
import {PropertyViewModel} from '../../model/property/propertyViewModel';
import { Category } from 'src/app/model/category/category';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  
  private GET_PROPERTIES_URL = `${ApiService.BASE_URL}\\properties`;
  private GET_PROPERTIES_BY_CATEGORY_URL = `${ApiService.BASE_URL}\\properties`;
  private POST_PROPERTY_URL = `${ApiService.BASE_URL}\\properties\\add`;
  private PUT_PROPERTY_URL = `${ApiService.BASE_URL}\\properties\\`;
  private DELETE_PROPERTY_URL = `${ApiService.BASE_URL}\\properties\\`;

  constructor(private http: HttpClient) { }

  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.GET_PROPERTIES_URL);
  }

  getAllPropertiesByCategory(category: Category): Observable<Property[]> {
    return this.http.get<Property[]>(this.GET_PROPERTIES_BY_CATEGORY_URL + category);
  }

  postProperty(property: PropertyViewModel): Observable<any> {
    return this.http.post(this.POST_PROPERTY_URL, property);
  }

  putProperty(id: number, property: PropertyViewModel): Observable<any> {
    return this.http.put(this.PUT_PROPERTY_URL + id, property);
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete(this.DELETE_PROPERTY_URL + id);
  }
}
