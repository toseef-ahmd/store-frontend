import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

import { Token } from 'src/app/models/token.model';
import {  Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  username: string = '';
  password: string = ''
  usernameError : boolean = false;
  passwordError : boolean = false;
  loginError : boolean = false;
  errorMsg : string = ''

  token : Token = {token: ''}

  constructor(private authService : AuthService, private router : Router, private location: Location, private appComp: AppComponent) {

  }

  ngOnInit(): void {
    const token = this.authService.getToken();
    this.appComp.ChangeDisableHeader(true)
    // if(token.length>0) {
    //   this.router.navigate(['products'])
    // }
  }

  login(username : string, password : string) : void {
    this.authService
    .login(username, password)
    .subscribe({
      next: (res) => {
        this.handleSuccess(res)
        this.appComp.ChangeDisableHeader(false)
      },
      error: (e) => {
        console.log("error")
        this.loginError = true
        this.errorMsg = e.error
      },
    });
  }

  handleLogin() : void {
   if(this.FormContainsErrors()) {
      return;  
    }
    this.login(this.username, this.password); 
  }

  FormContainsErrors() : boolean {

    this.usernameError = this.username.length==0 ? true : false;
    this.passwordError = this.password.length==0 ? true : false;
    
    return this.usernameError || this.passwordError;
    
  }

  handleSuccess(res : Token) : void {
    this.token = res as Token;
    this.loginError = false;
    localStorage.setItem("token", this.token.token)

    if (window.history.length > 1) {
      this.location.back()
    } else {
      this.router.navigate([''])
    }
  }

}


