import { AfterViewInit, Component, OnInit} from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { faCartShopping, faUser, faSignOut, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  faCartShopping = faCartShopping;
  faUser = faUser;
  faSignOut = faSignOut
  faSignOutAlt = faSignOutAlt

  isNavbarCollapsed : boolean = true;
  cartItemsCount : number = 0;
  token : string = ''
  loggedIn : boolean = false
  user : User = {username: '', password : '', firstname:'', lastname : ''}

  constructor(private cartService: CartService, private authService : AuthService, private router : Router, private appComp : AppComponent) {
  
  }


  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      if(items) {
        this.cartItemsCount = items.length;
      }
      
    })

    this.token  = localStorage.getItem("token") as string;
    console.log("token: ",this.token)
    this.loggedIn = this.token?.length>0;
     
  }

  getUser(id: number) : void {
    this.authService.getUser(id).subscribe(res => {
      this.user = res;
    })
  }

  async handleLogout() : Promise<void> {
    await this.authService.logout();
    this.appComp.ChangeDisableHeader(true);

    this.router.navigate(['/login'])
  }
}