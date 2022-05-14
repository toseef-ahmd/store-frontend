import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

   products : Product[] = []
  //constructor() { }
  constructor(private productsService : ProductsService ) {}

  async ngOnInit() {
    await this.productsService.fetchProducts().subscribe(res => {
      console.log(res)
      this.products = res;
    });
  }

}
