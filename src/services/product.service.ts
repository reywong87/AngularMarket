import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../interfaces/Product";
import {BaseHttpService} from "./base-http.service";

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseHttpService
{

  GetProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + "/products");
  }

  GetProduct(id: string): Observable<Product>{
    return this.http.get<Product>(this.apiUrl + "/products/" + id);
  }

  GetCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + "/products/categories");
  }

}
