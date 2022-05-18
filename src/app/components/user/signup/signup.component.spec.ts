import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SignupComponent } from './signup.component'

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from 'src/app/services/auth/auth.service';


describe('SignupComponent', () => {
  
  let component: SignupComponent
  let fixture: ComponentFixture<SignupComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SignupComponent],
      providers: [AuthService]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
