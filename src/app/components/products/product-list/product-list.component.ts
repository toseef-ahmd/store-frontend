import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core'
import { Product } from 'src/app/models/products.model'
import { ProductsService } from 'src/app/services/products/products.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: Product[] = []
  //constructor() { }
  constructor(
    private productsService: ProductsService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.cd.detectChanges()
  }
  ngOnInit() {
    this.productsService.fetchProducts().subscribe((res) => {
      this.products = res
    })
  }

  // addProducts(product : Product) : void {
  //   const $res = this.productsService.addProducts(product).pipe(share());
  //   $res.subscribe(res => {
  //     console.log(res)
  //   })
  // }
}
