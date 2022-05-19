import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthService } from 'src/app/services/auth/auth.service'
import { CartService } from 'src/app/services/cart/cart.service'

import { CheckoutSuccessComponent } from './checkout-success.component'

describe('CheckoutSuccessComponent', () => {
  let component: CheckoutSuccessComponent
  let fixture: ComponentFixture<CheckoutSuccessComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [CartService, AuthService],
      declarations: [CheckoutSuccessComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutSuccessComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
