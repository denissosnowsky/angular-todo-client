import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError } from 'rxjs'
import { UserDAO, UserDTO } from '../models/User'
import { ErrorService } from '../error/error.service'
import { environment } from '../../environments/environments'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor (private http: HttpClient, private errorService: ErrorService) {}

  signUp (user: UserDTO): Observable<UserDAO | null> {
    return this.http
      .post<UserDAO>(`${environment.URL}/auth/signup`, user, this.httpOptions)
      .pipe(catchError(this.errorService.handleError<null>(null)))
  }
}
