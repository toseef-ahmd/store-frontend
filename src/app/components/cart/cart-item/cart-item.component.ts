import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem.model';
import { Product } from 'src/app/models/products.model';
import { CartService } from 'src/app/services/cart/cart.service';
import {faTrashCan } from '@fortawesome/free-solid-svg-icons'

import { CartComponent } from '../cart.component';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  faCross = faTrashCan
  product : Product = {name : '', price: 100, details : '', avatar : '', rating : 0, quantity : 1}
  @Input() cartItem : CartItem = {product : this.product, quantity : 1};
  @Output() removeItemFromCart: EventEmitter<CartItem> = new EventEmitter();
  @Output() increaseQuantity : EventEmitter<CartItem> = new EventEmitter();
  @Output() decreaseQuantity : EventEmitter<CartItem> = new EventEmitter();

   constructor(private cartService: CartService, private cartComponent: CartComponent) { }

  ngOnInit(): void {
    
  }
  
  removeFromCart(): void {
    this.removeItemFromCart.emit(this.cartItem);
    //this.cartService.remove(this.cartItem);
  }

  setQuantity(e: Event): void {
    this.cartItem.quantity = parseInt( (e.target as HTMLSelectElement).value );
  }

  addQuantity() : void {
    this.increaseQuantity.emit(this.cartItem);
  }

  minusQuantity() : void {
    this.decreaseQuantity.emit(this.cartItem);
  }
}
