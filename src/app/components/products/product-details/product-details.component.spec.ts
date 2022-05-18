
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing'

import { CartService } from 'src/app/services/cart/cart.service'

import { ProductDetailsComponent } from './product-details.component'

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent
  let fixture: ComponentFixture<ProductDetailsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      imports : [BrowserDynamicTestingModule],
      providers : [CartService]
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
