import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../shared/api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputTypeService {
  GET_ALL_INPUT_TYPES_URL = `${ApiService.BASE_URL}/inputTypes`;

  constructor(public http: HttpClient) {
  }

  getAllInputTypes(): Observable<any> {
    return this.http.get<any>(this.GET_ALL_INPUT_TYPES_URL);
  }
}
