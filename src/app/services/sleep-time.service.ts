import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ISleepTime} from "../interfaces/isleep-time.Interface";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {RequestOptions} from "../classes/request-options/request-options.Class";
import {RequestFilter} from "../classes/request-filter/request-filter.Class";

@Injectable({
  providedIn: 'root'
})
export class SleepTimeService {
  private apiUrl = environment.apiUrl


  constructor(
    private http: HttpClient
  ) {
  }

  getUserSleepTimes(userId: string, options: RequestOptions): Observable<Array<ISleepTime>> {
    const params = options.getOptions().set('userId', userId)

    return this.http.get<Array<ISleepTime>>(`${this.apiUrl}/sleepTimes`, {
      params,
    }).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  filterSleepTimes(userId: string, options: RequestFilter): Observable<any> {
    let params = options.getOptions().set('userId', userId)

    return this.http.get<any>(`${this.apiUrl}/sleepTimes`, {
      params,
      observe: 'response'
    }).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  addSleepTime(sleepTime: ISleepTime) {
    return this.http.post<ISleepTime>(`${this.apiUrl}/sleepTimes`, sleepTime).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  removeSleepTime(timeId: string) {
    return this.http.delete<Array<ISleepTime>>(`${this.apiUrl}/sleepTimes/${timeId}`,).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  public handleError(err: HttpErrorResponse, caught: Observable<any>): Observable<any> {
    return throwError(err);
  }
}
