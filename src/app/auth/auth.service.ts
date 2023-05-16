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
  httpOptions (token?: string) {
    const jsonHeader = { 'Content-Type': 'application/json' }

    if (token) {
      const bearerHeader = { Authorization: `Bearer ${token}` }
      return { headers: new HttpHeaders({ ...jsonHeader, ...bearerHeader }) }
    }
    return { headers: new HttpHeaders(jsonHeader) }
  }

  constructor (private http: HttpClient, private errorService: ErrorService) {}

  signUp (user: UserDTO): Observable<UserDAO | null> {
    return this.http
      .post<UserDAO>(`${environment.URL}/auth/signup`, user, this.httpOptions())
      .pipe(catchError(this.errorService.handleError<null>(null)))
  }

  signIn (user: Omit<UserDTO, 'name'>): Observable<UserDAO | null> {
    return this.http
      .post<UserDAO>(`${environment.URL}/auth/signin`, user, this.httpOptions())
      .pipe(catchError(this.errorService.handleError<null>(null)))
  }

  signOut () {
    localStorage.removeItem('token')
  }

  verify (token: string): Observable<UserDAO | null> {
    return this.http
      .post<UserDAO>(
        `${environment.URL}/auth/verify`,
        null,
        this.httpOptions(token)
      )
      .pipe(catchError(this.errorService.handleError<null>(null)))
  }
}
