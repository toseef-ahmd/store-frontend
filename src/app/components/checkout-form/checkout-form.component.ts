import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Address } from 'src/app/models/checkout-address.model'
import { AuthService } from 'src/app/services/auth/auth.service'
import { CartService } from 'src/app/services/cart/cart.service'

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css'],
})
export class CheckoutFormComponent implements OnInit {
  addr$: Address = { email: '', address: '', state: '', zip: 0 }
  email = ''
  address = ''
  state = ''
  zip = 0
  saveAddress = false

  emailErr = false
  addressErr = false
  stateErr = false
  zipErr = false
  validEmail = true

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.addr$ = JSON.parse(localStorage.getItem('address') as string)

    if (this.addr$) {
      this.email = this.addr$.email
      this.address = this.addr$.address
      this.state = this.addr$.state
      this.zip = this.addr$.zip
    }
  }

  handleCheckout(): void {
    if (this.FormContainsErrors() === false) {
      const token: string = this.authService.getToken()
      if (token) {
        this.handleSaveAddress()
        this.router.navigate(['/checkout-success'])
      } else {
        this.addr$ = {
          email: this.email,
          address: this.address,
          state: this.state,
          zip: this.zip,
        }
        localStorage.setItem('address', JSON.stringify(this.addr$))

        this.router.navigate(['/login'])
      }
    }
  }

  FormContainsErrors(): boolean {
    this.emailErr = this.email.length == 0 ? true : false
    this.addressErr = this.address.length == 0 ? true : false
    this.stateErr = this.state.length == 0
    this.zipErr = this.zip === 0 ? true : false

    return this.emailErr || this.addressErr || this.stateErr || this.zipErr
  }

  handleSaveAddress(): void {
    if (!this.saveAddress) {
      localStorage.removeItem('address')
    } else {
      this.addr$ = {
        email: this.email,
        address: this.address,
        state: this.state,
        zip: this.zip,
      }

      localStorage.setItem('address', JSON.stringify(this.addr$))
    }
  }

  checkEmail(email: string): void {
    // eslint-disable-next-line no-useless-escape
    const re =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.validEmail = email.length > 0 && re.test(email)
  }
}
