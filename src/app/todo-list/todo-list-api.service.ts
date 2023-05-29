import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, BehaviorSubject, map } from 'rxjs'

import { TodoDTO } from '../models/Todo'
import { environment } from '../../environments/environments'
import { ErrorService } from '../error/error.service'

type TodosRes = {
  todos: Array<TodoDTO>
  count: number
}

@Injectable({
  providedIn: 'root'
})
export class TodoListApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
  }

  todoSubscriber$ = new BehaviorSubject<null>(null)

  constructor (private http: HttpClient, private errorService: ErrorService) {}

  getTodos (): Observable<Array<TodoDTO>> {
    return this.http
      .get<TodosRes>(`${environment.URL}/todos`, this.httpOptions)
      .pipe(
        catchError(this.errorService.handleError<null>(null)),
        map(res => res?.todos ?? [])
      )
  }

  addTodo (title: string, userId: string): Observable<TodoDTO | null> {
    const body = {
      userId,
      title,
      id: new Date().valueOf()
    }

    return this.http
      .post<TodoDTO>(`${environment.URL}/todos`, body, this.httpOptions)
      .pipe(catchError(this.errorService.handleError<null>(null)))
  }

  checkTodo (id: number): Observable<void | null> {
    return this.http
      .put<void>(`${environment.URL}/todos/${id}`, null, this.httpOptions)
      .pipe(catchError(this.errorService.handleError<null>(null)))
  }

  deleteTodo (id: number): Observable<void | null> {
    return this.http
      .delete<void>(
        `${environment.URL}/todos/delete?id=${id}`,
        this.httpOptions
      )
      .pipe(catchError(this.errorService.handleError<null>(null)))
  }
}
