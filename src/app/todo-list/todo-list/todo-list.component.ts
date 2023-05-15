import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from 'src/app/user/user.service'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  constructor (private userService: UserService, private router: Router) {}

  ngOnInit () {
    const isUserLogged = this.userService.getUserInfo().isLogged

    if (!isUserLogged) {
      this.router.navigateByUrl('/signUp')
    }
  }
}
