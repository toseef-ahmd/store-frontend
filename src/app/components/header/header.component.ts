import { Component, OnInit } from '@angular/core'
import { CartService } from 'src/app/services/cart/cart.service'
import {
  faCartShopping,
  faUser,
  faSignOut,
  faAdd,
  faPowerOff,
  faShoppingBasket
} from '@fortawesome/free-solid-svg-icons'

import { AuthService } from 'src/app/services/auth/auth.service'
import { User } from 'src/app/models/user.model'
import { Router } from '@angular/router'
import { AppComponent } from 'src/app/app.component'
import { ProductsService } from 'src/app/services/products/products.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faCartShopping = faCartShopping
  faUser = faUser
  faSignOut = faSignOut
  faSignOutAlt = faPowerOff
  faAdd = faAdd
  faShoppingBasket = faShoppingBasket
  isNavbarCollapsed = true
  cartItemsCount = 0
  token = ''
  loggedIn = false
  user: User = { username: '', password: '', firstname: '', lastname: '' }
  productsAvailable : boolean = true;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private appComp: AppComponent,
    private productService : ProductsService
  ) {
    this.authService.GetloggedInStatus().subscribe(res=> {
      this.loggedIn = res;
    })
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items) => {
      if (items) {
        this.cartItemsCount = items.length
      }
    })
    
    this.productService.fetchProducts().subscribe(res=> {
      if(res) {
        this.productsAvailable = true;
      }
      else {
        this.productsAvailable = false;
      }
    })

    const token : string = localStorage.getItem('token') as string
    console.log("token obtained")
    if(token) {
      this.loggedIn = true
      console.log(this.loggedIn)
    }
  }

  getUser(id: number): void {
    this.authService.getUser(id).subscribe((res) => {
      this.user = res

    })
  }

  async handleLogin(): Promise<void> {

    this.disableHeader()
  }

  async disableHeader(): Promise<void> {
    this.router.navigate(['/login'])
  }
  
  async handleLogout(): Promise<void> {
    
    await this.authService.logout()
    this.authService.ChangeLoggedInStatus(false);
    this.router.navigate(['/login'])
  }

  async dumpProducts() {
    await this.productService.addProducts().subscribe(res=> {
      console.log(res);
    })

    window.location.reload();
  }
}
