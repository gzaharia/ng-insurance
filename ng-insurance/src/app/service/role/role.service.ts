import {Injectable} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RoleViewModel} from '../../model/role/role-view-model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  GET_ALL_ROLES_URL = `${ApiService.BASE_URL}\\admin\\roles`;

  constructor(public http: HttpClient) {
  }

  getAllRoles(): Observable<RoleViewModel[]> {
    return this.http.get<RoleViewModel[]>(this.GET_ALL_ROLES_URL);
  }
}
