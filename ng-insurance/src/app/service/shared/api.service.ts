import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public static BASE_URL = 'http://localhost:8080/api';

  constructor() { }
}
