import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CartComponent } from './components/cart/cart.component'
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component'
import { CheckoutSuccessComponent } from './components/checkout-form/checkout-success/checkout-success.component'
import { OrdersListComponent } from './components/orders/orders-list/orders-list.component'
import { ProductDetailsComponent } from './components/products/product-details/product-details.component'
import { ProductListComponent } from './components/products/product-list/product-list.component'
import { AuthComponent } from './components/user/auth/auth.component'
import { SignupComponent } from './components/user/signup/signup.component'

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutFormComponent },
  { path: 'checkout-success', component: CheckoutSuccessComponent },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: AuthComponent },
  {path : 'orders', component : OrdersListComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
