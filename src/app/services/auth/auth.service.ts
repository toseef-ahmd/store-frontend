/* eslint-disable @typescript-eslint/no-inferrable-types */
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { User } from 'src/app/models/user.model'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Token } from 'src/app/models/token.model'
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  m_baseURL: string = environment.BASE_URL as string
  token: string = ''
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token') as string
  }

  login(username: string, password: string): Observable<unknown> {
    const body = Object({ username: username, password: password })

    const $data : Observable<unknown> = this.http.post<unknown>(this.m_baseURL + '/users/authenticate', body);
    console.log($data)
    $data.subscribe(res => {
      console.log("res")
      console.log(res)
    })

    return $data
  }

  signup(user: User): Observable<Token> {
    return this.http.post<Token>(this.m_baseURL + '/users', user)
  }

  getToken(): string {
    return this.token
  }

  getUser(id: number): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    })

    return this.http.get<User>(this.m_baseURL + `/users/${id}`, {
      headers: headers,
    })
  }

  logout(): boolean {
    localStorage.removeItem('token')

    return true
  }

  getAuthenticatedUserID(): number {
    const helper: JwtHelperService = new JwtHelperService()
    const decodedToken = helper.decodeToken(this.token)
    console.log(decodedToken)
    return decodedToken.id
  }
}
