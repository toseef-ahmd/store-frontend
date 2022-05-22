import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { Product } from 'src/app/models/products.model'
import { ProductsService } from 'src/app/services/products/products.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = []
  localProducts: Product[] = []

  //constructor() { }
  constructor(
    private productsService: ProductsService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productsService.fetchProducts().subscribe((res) => {
      this.products = res
      localStorage.setItem('products', JSON.stringify(this.products))
    })
  }
}
