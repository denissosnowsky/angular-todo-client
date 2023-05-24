import { Injectable } from '@angular/core'
import { TodoDTO } from '../models/Todo'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, BehaviorSubject, tap } from 'rxjs'

import { environment } from '../../environments/environments'
import { ErrorService } from '../error/error.service'

type TodosRes = {
  todos: Array<TodoDTO>
  count: number
}

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
  }

  todoSubscriber$ = new BehaviorSubject<null>(null)

  constructor (private http: HttpClient, private errorService: ErrorService) {}

  getTodos (): Observable<TodosRes | null> {
    return this.http
      .get<TodosRes>(`${environment.URL}/todos`, this.httpOptions)
      .pipe(catchError(this.errorService.handleError<null>(null)))
  }

  addTodo (title: string, userId: string): Observable<TodoDTO | null> {
    const body = {
      userId,
      title,
      id: new Date().valueOf()
    }

    return this.http
      .post<TodoDTO>(`${environment.URL}/todos`, body, this.httpOptions)
      .pipe(
        catchError(this.errorService.handleError<null>(null)),
        tap(_ => {
          this.todoSubscriber$.next(null)
        })
      )
  }

  checkTodo (id: number): Observable<void | null> {
    return this.http
      .put<void>(`${environment.URL}/todos/${id}`, null, this.httpOptions)
      .pipe(
        catchError(this.errorService.handleError<null>(null)),
        tap(_ => {
          this.todoSubscriber$.next(null)
        })
      )
  }

  deleteTodo (id: number): Observable<void | null> {
    return this.http
      .delete<void>(
        `${environment.URL}/todos/delete?id=${id}`,
        this.httpOptions
      )
      .pipe(
        catchError(this.errorService.handleError<null>(null)),
        tap(_ => {
          this.todoSubscriber$.next(null)
        })
      )
  }
}
