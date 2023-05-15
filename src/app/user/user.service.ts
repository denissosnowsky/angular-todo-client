import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLogged: boolean = false

  getUserInfo () {
    if (!this.isLogged) {
      this.isLogged = this.checkUserAuth()
    }

    return {
      isLogged: this.isLogged
    }
  }

  setUserLogged () {
    this.isLogged = true
  }

  setUserLoggedOut () {
    this.isLogged = false
  }

  private checkUserAuth (): boolean {
    const token: string | null = localStorage.getItem('token')

    return !!token
  }
}
