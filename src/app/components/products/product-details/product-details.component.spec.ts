import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { CartService } from 'src/app/services/cart/cart.service'

import { ProductDetailsComponent } from './product-details.component'

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent
  let fixture: ComponentFixture<ProductDetailsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ProductDetailsComponent],
      providers: [CartService, BrowserDynamicTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
