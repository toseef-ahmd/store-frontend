/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AppComponent } from 'src/app/app.component'
import { Token } from 'src/app/models/token.model'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth/auth.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  username: string = ''
  password: string = ''
  cpassword: string = ''
  firstname: string = ''
  lastname: string = ''
  token: Token = { token: '' }
  invalidFirstname: boolean = false
  invalidLastname: boolean = false

  usernameErr: boolean = false
  passwordErr: boolean = false
  cpasswordErr: boolean = false
  firstnameErr: boolean = false
  lastnameErr: boolean = false
  passMinLengthErr: boolean = false
  nameMinLengthErr: boolean = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private app: AppComponent
  ) {}

  ngOnInit(): void {
    this.app.ChangeDisableHeader(true)
  }

  signup(): void {
    const user: User = {
      username: this.username,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
    }

    this.authService.signup(user).subscribe((res) => {
      this.token = res
      Swal.fire('', 'Successfully Signed Up', 'success')

      localStorage.setItem('token', JSON.stringify(this.token.token))
      this.app.ChangeDisableHeader(false)
      this.router.navigate(['/products'])
    })
  }

  async handleSubmit(): Promise<void> {
    if (this.FormContainsErrors() == false) {
      await this.signup()
    }
  }

  FormContainsErrors(): boolean {
    this.usernameErr = this.username.length == 0 ? true : false
    this.passwordErr = this.password.length == 0 ? true : false
    this.cpasswordErr = this.cpassword === this.password ? false : true
    this.firstnameErr = this.firstname.length == 0 ? true : false
    this.lastnameErr = this.lastname.length == 0 ? true : false
    this.nameMinLengthErr = this.username.length < 5 ? true : false
    this.passMinLengthErr = this.password.length < 5 ? true : false

    return (
      this.usernameErr ||
      this.passwordErr ||
      this.cpasswordErr ||
      this.firstnameErr ||
      this.lastnameErr ||
      this.nameMinLengthErr ||
      this.passMinLengthErr ||
      this.invalidFirstname ||
      this.invalidLastname
    )
  }

  passwordsMatch(password: string): void {
    this.cpasswordErr = password === this.password ? false : true
  }

  checkFNameLetters(text: string): void {
    this.invalidFirstname = /[^a-zA-Z]/.test(text)
  }

  checkLNameLetters(text: string): void {
    this.invalidLastname = /[^a-zA-Z]/.test(text)
  }
}
