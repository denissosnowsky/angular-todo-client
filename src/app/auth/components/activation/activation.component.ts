import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from 'src/app/user/user.service'

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent {
  constructor (private router: Router, private userService: UserService) {}

  ngOnInit () {
    const isUserActivated = this.userService.getUserInfo().isActivated

    if (isUserActivated) {
      this.router.navigateByUrl('/')
    }
  }
}
