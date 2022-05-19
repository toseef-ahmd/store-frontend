import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { CartService } from 'src/app/services/cart/cart.service'
import { ProductsService } from 'src/app/services/products/products.service'
import { CartComponent } from '../cart.component'

import { CartItemComponent } from './cart-item.component'

describe('CartItemComponent', () => {
  let component: CartItemComponent
  let fixture: ComponentFixture<CartItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [CartComponent, CartService, ProductsService],
      declarations: [CartItemComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
