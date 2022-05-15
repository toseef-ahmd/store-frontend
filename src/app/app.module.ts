import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AboutComponent } from './components/about/about.component'
import { ButtonComponent } from './components/button/button.component'
import { HeaderComponent } from './components/header/header.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ContentComponent } from './components/content/content.component'
import { FooterComponent } from './components/footer/footer.component'
import { ProductComponent } from './components/products/product/product.component'
import { ProductListComponent } from './components/products/product-list/product-list.component'
import { ProductDetailsComponent } from './components/products/product-details/product-details.component'
import { AuthComponent } from './components/user/auth/auth.component'
import { SignupComponent } from './components/user/signup/signup.component'
import { ProductsService } from './services/products/products.service'
import { CartService } from './services/cart/cart.service'
import { CartComponent } from './components/cart/cart.component'
import { CartItemComponent } from './components/cart/cart-item/cart-item.component'
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CheckoutSuccessComponent } from './components/checkout-form/checkout-success/checkout-success.component'

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ButtonComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ProductComponent,
    ProductListComponent,
    ProductDetailsComponent,
    AuthComponent,
    SignupComponent,
    CartComponent,
    CartItemComponent,
    CheckoutFormComponent,
    CheckoutSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [ProductsService, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
