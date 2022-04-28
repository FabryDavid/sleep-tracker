import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {IUser} from "../interfaces/iuser.Interface";
import {catchError, concatMap} from "rxjs/operators";
import {AlreadyRegisteredException} from "../exceptions/already-registered/already-registered-exception.Class";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) {
  }

  registerUser(user: IUser): Observable<IUser> {
    return this.getUserByEmail(user.email).pipe(
      concatMap((data) => {
        if (data) {
          if (data.length > 0) {
            throw new AlreadyRegisteredException('User already registered with this email')
          }
        }

        return this.http.post(`${this.apiUrl}/users`, user).pipe(
          catchError(this.handleError.bind(this))
        )
      })
    );
  }

  getUserByEmail(email: string): Observable<Array<IUser>> {
    const params = new HttpParams().set('email', email)

    return this.http.get<Array<IUser>>(`${this.apiUrl}/users`, {
      params,
    }).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  public handleError(err: HttpErrorResponse, caught: Observable<any>): Observable<any> {
    return throwError(err);
  }
}
