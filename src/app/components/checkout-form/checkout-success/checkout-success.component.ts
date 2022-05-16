import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, share } from 'rxjs'
import { Order } from 'src/app/models/order.model'
import { AuthService } from 'src/app/services/auth/auth.service'
import { CartService } from 'src/app/services/cart/cart.service'
import Swal from 'sweetalert2'
import { OrderItems } from 'src/app/models/orderItem.model'

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css'],
})
export class CheckoutSuccessComponent implements OnInit {
  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
  ) {}
  async ngOnInit(): Promise<void> {
    await this.createOrder()
    await this.loadAnimation()

    localStorage.removeItem('cartItems')
    this.cartService.emptyCart()
    this.router.navigate([''])
  }

  async loadAnimation() {
    await Swal.fire({
      title: '',
      text: 'Order Placed',
      icon: 'success',
      confirmButtonText: 'Continue Shopping',
    })
  }

  createOrder(): void {
    const $order: Observable<Order> = this.cartService
      .createOrder()
      .pipe(share())

    $order.subscribe((res) => {

      this.addItemsInOrder(res.id as number)
    })
  }

  addItemsInOrder(orderID: number): void {
    const $result = this.cartService.getCartItems().pipe(share());
    console.log("Cart Items:")
    $result.subscribe((res) => {
      res.map((item) => {
        
        const $orderItem: Observable<OrderItems> = this.cartService
          .addItemsToOrder(orderID, item)
          .pipe(share())

        $orderItem.subscribe((res) => {
          return res
        })
      })
    })
  }
}
