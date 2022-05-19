import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from 'src/app/app.component'
import { AuthService } from 'src/app/services/auth/auth.service'
import { ProductsService } from 'src/app/services/products/products.service'

import { AuthComponent } from './auth.component'

describe('AuthComponent', () => {
  let component: AuthComponent
  let fixture: ComponentFixture<AuthComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, ProductsService, AppComponent],
      declarations: [AuthComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
