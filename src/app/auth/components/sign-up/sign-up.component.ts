import { Component } from '@angular/core'
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../auth.service'
import { UserDTO } from 'src/app/models/User'
import { UserService } from 'src/app/user/user.service'

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const passwordFirst = control.get('passwordFirst')
  const passwordSecond = control.get('passwordSecond')

  if (!passwordFirst || !passwordSecond) {
    return null
  }

  if (passwordFirst.value !== passwordSecond.value) {
    passwordSecond.setErrors({ passwordMismatch: true })
    return { passwordMismatch: true }
  } else {
    passwordSecond.setErrors(null)
    return null
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  loading: boolean = false

  constructor (
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  signUpForm = new FormGroup(
    {
      name: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email
      ]),
      passwordFirst: new FormControl<string>('', [Validators.required]),
      passwordSecond: new FormControl<string>('', [Validators.required])
    },
    { validators: passwordMatchValidator }
  )

  get name () {
    return this.signUpForm.get('name')
  }

  get email () {
    return this.signUpForm.get('email')
  }

  get passwordFirst () {
    return this.signUpForm.get('passwordFirst')
  }

  get passwordSecond () {
    return this.signUpForm.get('passwordSecond')
  }

  onSubmit () {
    this.loading = true

    const userData: UserDTO = {
      email: this.signUpForm.value.email!,
      name: this.signUpForm.value.name!,
      password: this.signUpForm.value.passwordSecond!
    }

    const signUpStream$ = this.authService.signUp(userData)

    signUpStream$.subscribe(res => {
      if (res) {
        localStorage.setItem('token', res.token)
        this.userService.setUserLogged()
        this.router.navigateByUrl('/')
      }

      this.loading = false
    })
  }
}
