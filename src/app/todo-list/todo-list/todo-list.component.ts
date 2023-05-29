import { Component } from '@angular/core'
import { mergeMap, tap, Observable, of } from 'rxjs'
import { TodoDTO } from '../../models/Todo'
import { TodoListService } from '../todo-list.service'
import { AddTodoEvent } from '../../todo-list/todo-list/components/form/form.component'
import { UserService } from 'src/app/user/user.service'
import { TodoListApiService } from '../todo-list-api.service'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  list$: Observable<Array<TodoDTO>> = of<Array<TodoDTO>>([])

  constructor (
    private todoListService: TodoListService,
    private todoListApiService: TodoListApiService,
    private userService: UserService
  ) {}

  ngOnInit () {
    this.list$ = this.todoListService.getTodos$()
    this.getTodos()
  }

  getTodos (): void {
    this.todoListApiService.getTodos().subscribe(todos => {
      this.todoListService.save(todos)
    })
  }

  deleteTodo (id: number) {
    this.todoListApiService
      .deleteTodo(id)
      .pipe(
        tap(_ => {
          this.getTodos()
        })
      )
      .subscribe()
  }

  checkTodo (id: number) {
    this.todoListApiService
      .checkTodo(id)
      .pipe(
        tap(_ => {
          this.getTodos()
        })
      )
      .subscribe()
  }

  addTodo (addTodoEvent: AddTodoEvent) {
    const userId = this.userService.getUserInfo().id

    this.todoListApiService
      .addTodo(addTodoEvent.value, userId)
      .pipe(
        tap(_ => {
          this.getTodos()
        })
      )
      .subscribe(_ => {
        addTodoEvent.resetValue()
      })
  }
}
