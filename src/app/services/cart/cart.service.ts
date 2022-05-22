/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { CartItem } from 'src/app/models/cartItem.model'
import { Order } from 'src/app/models/order.model'
import { OrderItems } from 'src/app/models/orderItem.model'
import { Product } from 'src/app/models/products.model'
import { environment } from 'src/environments/environment'
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = []
  order: Order = { user_id: 0, status: 'processing' }
  orderItem: OrderItems = { order_id: 0, product_id: 0, quantity: 1 }
  count = new BehaviorSubject<number>(0)
  addedItems = new BehaviorSubject<CartItem[]>([])
  total = new BehaviorSubject<number>(0)

  m_baseURL: string = environment.BASE_URL as string

  token: string = ''
  userID: number = 0
  orderItems: CartItem[] = []

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userID = this.authService.getAuthenticatedUserID()
    this.token = localStorage.getItem('token') as string

    console.log(this.userID)
  }

  add(product: Product, quantity: number) {
    const localItems: CartItem[] = JSON.parse(
      localStorage.getItem('cartItems') as string
    )

    if (localItems) {
      this.cartItems = localItems
    }

    const found: CartItem | undefined = this.cartItems.find(
      (p) => p.product.id == product.id
    )

    if (found) {
      localStorage.removeItem('cartItems')
      found.quantity += quantity
      console.log('Updated...')
    } else {
      const cartItem: CartItem = {
        product: product,
        quantity: quantity,
      }

      this.cartItems.push(cartItem)
      console.log('Added...')
    }

    this.addedItems.next(this.cartItems)
    this.count.next(this.updateItemsCount())
    this.total.next(this.updateItemsTotal())

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
  }

  async syncLocalCartItems(cartItems: CartItem[]): Promise<void> {
    console.log('Cart Items')
    console.log(cartItems)

    this.addedItems.next(cartItems)
    this.count.next(this.updateItemsCount())
    this.total.next(this.updateItemsTotal())
  }

  getCartItems(): BehaviorSubject<CartItem[]> {
    const cartItems: CartItem[] = JSON.parse(
      localStorage.getItem('cartItems') as string
    )

    if (cartItems) {
      this.syncLocalCartItems(cartItems)
    }
    this.addedItems.next(cartItems)

    return this.addedItems
  }

  remove(cartItem: CartItem) {
    if (this.cartItems.length == 0) {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems') as string)
    }

    this.cartItems = this.cartItems.filter(
      (p) => p.product.id !== cartItem.product.id
    )

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems))

    this.addedItems.next(this.cartItems)
    this.count.next(this.updateItemsCount())
    this.total.next(this.updateItemsTotal())
  }

  emptyCart(): void {
    localStorage.removeItem('cartItems')

    this.cartItems = []
    this.addedItems.next(this.cartItems)
  }

  getOrder(): Order {
    return this.order
  }

  updateItemsTotal(): number {
    let total = 0
    this.addedItems
      .getValue()
      .forEach((p) => (total += p.quantity * p.product.price))

    return total
  }

  updateItemsCount(): number {
    let count = 0
    this.addedItems.getValue().forEach((p) => (count += p.quantity))

    return count
  }

  checkQuantity(): void {
    console.log('this.cartItems')
    console.log(this.cartItems)

    console.log('this.addedItems')
    console.log(this.addedItems)
  }

  updateQuantity(cartItem: CartItem, type: string): void {
    localStorage.removeItem('cartItems')
    const Item: CartItem = this.addedItems
      .getValue()
      .find((item) => item.product.id == cartItem.product.id) as CartItem

    if (type == 'add') {
      Item.quantity += 1
      if (Item.quantity > Item.product.quantity) {
        Item.quantity = Item.product.quantity
      }
    } else if (type == 'minus') {
      Item.quantity -= 1
      if (Item.quantity < 1) {
        Item.quantity = 1
      }
    }
    this.total.next(this.updateItemsTotal())

    localStorage.setItem(
      'cartItems',
      JSON.stringify(this.addedItems.getValue())
    )
  }

  getItemsCount(): BehaviorSubject<number> {
    return this.count
  }

  getItemsTotal(): BehaviorSubject<number> {
    return this.total
  }

  createOrder(): Observable<Order> {
    this.order = { user_id: this.userID, status: 'processing' }

    const body: Object = {
      user_id: this.order.user_id,
      status: this.order.status,
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    })

    return this.http.post<Order>(this.m_baseURL + '/orders/', body, {
      headers: headers,
    })
    // return this.http.post<Order>(this.m_baseURL+'orders/', body, {headers: headers})
  }

  addItemsToOrder(orderID: number, cartItem: CartItem): Observable<OrderItems> {
    const body: Object = {
      order_id: orderID,
      product_id: cartItem.product.id as number,
      quantity: cartItem.quantity,
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    })

    return this.http.post<OrderItems>(
      this.m_baseURL + `/orders/${orderID}/products`,
      body,
      { headers: headers }
    )
  }
}
