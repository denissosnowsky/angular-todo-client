import { Injectable } from '@angular/core'
import { TodoDTO } from '../models/Todo'
import { Observable, BehaviorSubject, tap } from 'rxjs'

import { environment } from '../../environments/environments'

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private todoList$ = new BehaviorSubject<Array<TodoDTO>>([])

  constructor () {}

  getTodos$ (): Observable<Array<TodoDTO>> {
    return this.todoList$.asObservable()
  }

  save (value: Array<TodoDTO>): void {
    this.todoList$.next(value)
  }
}
