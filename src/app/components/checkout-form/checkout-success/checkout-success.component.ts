import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Order } from 'src/app/models/order.model'
import { AuthService } from 'src/app/services/auth/auth.service'
import { CartService } from 'src/app/services/cart/cart.service'
import Swal from 'sweetalert2'
import { OrderItems } from 'src/app/models/orderItem.model'
import { CartItem } from 'src/app/models/cartItem.model'
import { AnimationService } from 'src/app/services/animation/animation.service'
import { Observable, share } from 'rxjs'

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css'],
})
export class CheckoutSuccessComponent implements OnInit {
  cartItems: CartItem[] = []
  totalValue = 0
  userName = ''

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private animation: AnimationService
  ) {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') as string)

    this.cartService.getItemsTotal().subscribe((val) => {
      this.totalValue = val
    })

    this.authService
      .getUser(this.authService.getAuthenticatedUserID())
      .subscribe((res) => {
        this.userName = res.firstname
      })
  }

  async ngOnInit(): Promise<void> {
    await this.createOrder()
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
    console.log('order items')
    console.log(this.cartItems)
    this.cartItems.map((item) => {
      const $orderItem: Observable<OrderItems> = this.cartService
        .addItemsToOrder(orderID, item)
        .pipe(share())

      $orderItem.subscribe((res) => {
        return res
      })
    })

    this.cartService.emptyCart()

    Swal.fire({
      title: 'Order Placed',
      icon: 'success',
      html:
        `<b>Thank you ${this.userName} for shopping with us.</b></br></br> ` +
        'Your order will be delivered in 3-5 working days </br></br>' +
        `Please keep cash amount of <b>$${this.totalValue}</b> on you to receive the package </br></br>` +
        'Happy Shopping',
      focusConfirm: true,
      confirmButtonText: 'Continue Shopping',
    }).then(() => {
      this.router.navigate([''])
    })
  }
}
