import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core'
import { share } from 'rxjs'
import { Product } from 'src/app/models/products.model'
import { ProductsService } from 'src/app/services/products/products.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: Product[] = []
  localProducts : Product[] = []
  
  //constructor() { }
  constructor(
    private productsService: ProductsService,
    private cd: ChangeDetectorRef
  ) {
    
  }

  ngAfterViewInit(): void {
      this.cd.detectChanges()
      //this.ngOnInit();
    }

  ngOnInit() : void {
    this.products= this.productsService.fetchProducts();
      if(this.products.length==0) {
        const $local = this.productsService.fetchLocalProducts().pipe(share());

      $local.subscribe((res) => {
        this.productsService.addProducts(res).subscribe(data=> {
          console.log(data)
        })
        this.products = res;
      })
    }
  }
    
}
