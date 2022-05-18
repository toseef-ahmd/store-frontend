import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { CartService } from 'src/app/services/cart/cart.service'

import { CheckoutFormComponent } from './checkout-form.component'

describe('CheckoutFormComponent', () => {
  let component: CheckoutFormComponent
  let fixture: ComponentFixture<CheckoutFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [CartService],
      declarations: [CheckoutFormComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
