/* eslint-disable @typescript-eslint/ban-types */
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Product } from 'src/app/models/products.model'

import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  m_baseURL: string = environment.BASE_URL
  products: Product[] = []

  product = new BehaviorSubject<Product>({
    name: '',
    quantity: 0,
    price: 0,
    avatar: '',
    details: '',
    rating: 0,
  })
  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.m_baseURL + '/products')
  }

  fetchLocalProducts(): Observable<Product[]> {
    const $data = this.http.get<unknown>('assets/products.json')

    $data.subscribe((res) => {
      this.products = res as Product[]
      localStorage.setItem('products', JSON.stringify(this.products))
    })

    return $data as Observable<Product[]>
  }
  getProductByID(id: number): Observable<Product> {
    if (this.products.length == 0) {
      this.products = JSON.parse(localStorage.getItem('products') as string)
    }
    this.product.next(this.products.filter((item) => item.id == id)[0])
    return this.product
  }

  addProducts(): Observable<Product> {
    const token: string = localStorage.getItem('token') as string

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })

    return this.http.post<Product>(this.m_baseURL + '/products/load', {
      headers: headers,
    })
  }
}
