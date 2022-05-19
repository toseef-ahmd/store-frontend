import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OrderService } from 'src/app/services/orders/order.service'

import { OrdersListComponent } from './orders-list.component'

describe('OrdersListComponent', () => {
  let component: OrdersListComponent
  let fixture: ComponentFixture<OrdersListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersListComponent],
      imports: [HttpClientTestingModule],
      providers: [OrderService],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
