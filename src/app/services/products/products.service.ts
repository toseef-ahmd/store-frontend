import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/products.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  m_baseURL : string = environment.BASE_URL;
  products : Product[] = []
  constructor(private http : HttpClient) { }

  fetchProducts() : Observable<Product[]> {
    return this.http.get<[]>(this.m_baseURL+'/products');
  }

  getProductByID (id : number) : Observable<Product> {
    return this.http.get<Product>(this.m_baseURL+`/products/${id}`);
  }

}
