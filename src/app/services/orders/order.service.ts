import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { UserOrders } from 'src/app/models/user-orders.model'
import { environment } from 'src/environments/environment'
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: UserOrders[] = []
  m_baseURL: string = environment.BASE_URL as string

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getUserOrders().subscribe((res) => {
      this.orders = res
    })
  }

  getUserOrders(): Observable<UserOrders[]> {
    const token: string = this.authService.getToken()

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })

    return this.http.get<UserOrders[]>(this.m_baseURL + '/user_orders/', {
      headers: headers,
    })
  }
}
