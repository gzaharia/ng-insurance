import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
export class CategoryService{

//private _url: string = "localhost:/categories";
private _url: string = "/assets/data/categories.json";

  constructor (private http: HttpClient){}

  getCategories(){
    return this.http.get(this._url);
  }
}

