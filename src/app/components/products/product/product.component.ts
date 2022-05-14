import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product : Product = {name : '', price: 0, details : '', avatar : '', rating : 0, quantity : 1}
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
