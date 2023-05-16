import { Injectable } from '@angular/core'
import jwtDecode from 'jwt-decode'
import { tap, Observable, of } from 'rxjs'
import { AuthService } from '../auth/auth.service'
import { UserDAO } from '../models/User'

type Token = {
  exp: number
  email: string
  name: string
  id: string
  isActivated: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLogged: boolean = false
  private isActivated: boolean = false
  private name: string = ''
  private email: string = ''
  private id: string = ''

  constructor (private authService: AuthService) {}

  getUserInfo () {
    return {
      isLogged: this.isLogged,
      isActivated: this.isActivated
    }
  }

  setUserLogged (token: string) {
    localStorage.setItem('token', token)
    this.isLogged = true
  }

  setUserLoggedOut () {
    this.isLogged = false
    this.isActivated = false
    this.authService.signOut()
  }

  setUserActivationStatus () {
    this.isActivated = true
  }

  checkUserAuthStatus (): Observable<UserDAO | null> {
    const token: string | null = localStorage.getItem('token')

    if (!this.isIdTokenValid(token)) {
      this.isLogged = false
      this.isActivated = false
      return of(null)
    }

    const verifyStream$ = this.authService.verify(token!)

    return verifyStream$.pipe(
      tap(user => {
        if (user) {
          localStorage.setItem('token', user.token)
          this.isLogged = true
          this.isActivated = user!.isActivated
          this.id = user!.id
          this.email = user!.email
          this.name = user!.name
        } else {
          this.isLogged = false
          this.isActivated = false
        }
      })
    )
  }

  private isIdTokenValid = (token: string | null): boolean => {
    if (!token) {
      return false
    }

    const systemTime = Math.round(Date.now() / 1000)
    const { exp } = jwtDecode<Token>(token)

    return exp !== undefined && systemTime < exp
  }
}
