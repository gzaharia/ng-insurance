import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static BASE_URL = 'https://insurancerest.herokuapp.com/api';

  constructor() {
  }
}
