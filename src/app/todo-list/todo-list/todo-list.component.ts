import { Component } from '@angular/core'
import { mergeMap, tap } from 'rxjs'
import { TodoDTO } from '../../models/Todo'
import { TodoListService } from '../todo-list.service'
import { AddTodoEvent } from '../../todo-list/todo-list/components/form/form.component'
import { UserService } from 'src/app/user/user.service'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  list: Array<TodoDTO> = []

  constructor (
    private todoListService: TodoListService,
    private userService: UserService
  ) {}

  ngOnInit () {
    this.todoListService.todoSubscriber$
      .pipe(
        mergeMap(_ => {
          return this.getTodos()
        })
      )
      .subscribe()
  }

  getTodos () {
    return this.todoListService.getTodos().pipe(
      tap(data => {
        this.list = data?.todos ?? []
      })
    )
  }

  deleteTodo (id: number) {
    this.todoListService.deleteTodo(id).subscribe()
  }

  checkTodo (id: number) {
    this.todoListService.checkTodo(id).subscribe()
  }

  addTodo (addTodoEvent: AddTodoEvent) {
    const userId = this.userService.getUserInfo().id

    this.todoListService.addTodo(addTodoEvent.value, userId).subscribe(_ => {
      addTodoEvent.resetValue()
    })
  }
}
