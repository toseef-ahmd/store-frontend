import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/products.model';
import { ProductsService } from 'src/app/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product : Product = {name : '', price: 0, details : '', avatar : '', rating : 0, quantity : 1}
  quantity : number = 1;
 
  constructor(private route : ActivatedRoute , private productService : ProductsService, private cartService : CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productService.getProductByID(params['id'] as number).subscribe(res => {
        console.log(res)
        this.product = res;
      })
    })
  }

  addToCart(): void {
    this.cartService.add(this.product, this.quantity);
    Swal.fire('', 'Product added in Cart', 'success');
  }

  setQuantity(e: Event): void {
    this.quantity = parseInt( (e.target as HTMLSelectElement).value );
  }

}
