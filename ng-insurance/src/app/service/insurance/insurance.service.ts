import { Injectable } from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Observable} from 'rxjs';
import {Insurance} from '../../model/insurance/insurance';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  
  private GET_ALL_INSURANCES_URL = `${ApiService.BASE_URL}\\insurances`;
  private GET_ONE_INSURANCE_URL = `${ApiService.BASE_URL}\\insurances\\`;
  private POST_ONE_INSURANCE_URL = `${ApiService.BASE_URL}\\insurances\\add\\`;
  private GET_ONE_BY_NAME_URL = `${ApiService.BASE_URL}\\insurances\\name\\`;
  private EDIT_ONE_INSURANCE_URL = `${ApiService.BASE_URL}\\insurances\\edit\\`;
  private DELETE_ONE_INSURANCE_URL = `${ApiService.BASE_URL}\\insurances\\delete\\`;

  constructor(private http: HttpClient) { }

  getAllInsurances(): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(this.GET_ALL_INSURANCES_URL);
  }

  getOneInsurance(id: number): Observable<Insurance> {
    return this.http.get<Insurance>(this.GET_ONE_INSURANCE_URL + id);
  }

  getOneInsuranceByName(name: string): Observable<Insurance> {
    return this.http.get<Insurance>(this.GET_ONE_BY_NAME_URL + name);
  }

  postInsurance(insurance: Insurance): Observable<any>{
    return this.http.post(this.POST_ONE_INSURANCE_URL, insurance);
  }

  editOneInsurance(id: number, insurance: Insurance): Observable<any> {
    return this.http.put(this.EDIT_ONE_INSURANCE_URL + id, insurance);
  }

  deleteInsurance(id: number): Observable<any>{
    return this.http.delete(this.DELETE_ONE_INSURANCE_URL + id);
  }
}
