import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/products.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  m_baseURL : string = environment.BASE_URL;
  products : Product[] = [];
  
  product = new BehaviorSubject<Product>({name:'', quantity : 0, price: 0, avatar:'', details : '', rating : 0})
  constructor(private http : HttpClient) { 
   // this.products.next(Products)
    
  }

  fetchProducts() : Observable<Product[]> {
    const $data = this.http.get<any>("src/assets/products.json");
    console.log("data")
    console.log($data)
    $data.subscribe(res=> {
      this.products = res
    })

    return $data;
  }

  getProductByID (id : number) : Observable<Product> {
    this.product.next(this.products.filter(item=> item.id==id)[0])
    console.log(this.product)
    return this.product
  }

  addProducts(products : Product[]) {
    const body : Object = {"products" : products}

    const token : string = localStorage.getItem("token") as string;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.post<[]>(this.m_baseURL+'/products/', body, {headers : headers});
  }
}
