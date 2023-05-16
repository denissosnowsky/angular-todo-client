import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from 'src/app/user/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  path: string = ''
  loading: boolean = true

  constructor (public userService: UserService, private router: Router) {}

  ngOnInit () {
    this.path = location.pathname

    this.checkUserAuthStatus()
  }

  changeAuthMethod () {
    if (this.path === '/signUp') {
      this.router.navigateByUrl('/signIn').then(_ => {
        this.path = location.pathname
      })
    }

    if (this.path === '/signIn') {
      this.router.navigateByUrl('/signUp').then(_ => {
        this.path = location.pathname
      })
    }
  }

  signOut () {
    this.userService.setUserLoggedOut()
    this.checkUserAuthStatus()
  }

  checkUserAuthStatus () {
    this.userService.checkUserAuthStatus().subscribe(_ => {
      const { isLogged, isActivated } = this.userService.getUserInfo()
      this.loading = false

      if (!isLogged) {
        this.router.navigateByUrl('/signUp').then(_ => {
          this.path = location.pathname
        })
        return
      }

      if (!isActivated) {
        this.router.navigateByUrl('/activate').then(_ => {
          this.path = location.pathname
        })
      }
    })
  }
}
