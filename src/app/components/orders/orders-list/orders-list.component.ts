import { Component, OnInit } from '@angular/core'
import { UserOrders } from 'src/app/models/user-orders.model'
import { OrderService } from 'src/app/services/orders/order.service'

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  constructor(private ordersService: OrderService) {}
  orders: UserOrders[] = []

  ngOnInit(): void {
    this.ordersService.getUserOrders().subscribe((res) => {
      this.orders = res
      console.log(this.orders)
    })
  }
}
