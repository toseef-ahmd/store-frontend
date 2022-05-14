import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { Address } from 'src/app/models/checkout-address.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // cartItems: Observable<CartItem[]> = new Observable<CartItem[]>();
  // total: Observable<number> = new Observable<number>();

  cartItems: CartItem[] = [] //Observable<CartItem[]> = new Observable<CartItem[]>();
  total: number = 0 //Observable<number> = new Observable<number>();
  
  constructor(private router : Router, private cartService: CartService, private authService : AuthService) { }

  ngOnInit(): void {
     //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.cartService.getCartItems().subscribe(items => {
      
      if(items) {
        this.cartItems = items
        items.forEach(item => this.total += (item.quantity * item.product.price))
      }
    });

  }

  removeCartItem(cartItem: CartItem): void {
    console.log("Remove Called")
    this.cartService.remove(cartItem);
  }

  increaseQuantity(cartItem : CartItem) : void {
    console.log("increase called")
    this.cartService.updateQuantity(cartItem, "add")
    this.updateTotal();
  }

  decreaseQuantity(cartItem : CartItem) : void {
    console.log("decrease called")
    this.cartService.updateQuantity(cartItem, "minus")
    this.updateTotal();
  }

  updateTotal() : void {
    this.cartService.getItemsTotal().subscribe(val => {
      this.total = val;
      console.log("total in component")
      console.log(this.total)
    })
  }

}
