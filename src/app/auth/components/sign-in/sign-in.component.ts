import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../auth.service'
import { UserService } from 'src/app/user/user.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserDTO } from 'src/app/models/User'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loading: boolean = false

  constructor (
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  signInForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required])
  })

  get email () {
    return this.signInForm.get('email')
  }

  get password () {
    return this.signInForm.get('password')
  }

  onSubmit () {
    this.loading = true

    const userData: Omit<UserDTO, 'name'> = {
      email: this.signInForm.value.email!,
      password: this.signInForm.value.password!
    }

    const signUpStream$ = this.authService.signIn(userData)

    signUpStream$.subscribe(res => {
      if (res) {
        this.userService.setUserLogged(res.token)
        this.router.navigateByUrl('/')
      }

      this.loading = false
    })
  }
}
