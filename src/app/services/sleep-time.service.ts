import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {ISleepTime} from "../interfaces/isleep-time.Interface";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {RequestOptions} from "../classes/request-options/request-options.Class";

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
    const params = new HttpParams()
      .set('userId', userId)
      .set('_sort', options.sort)
      .set('_order', options.order)
      .set('_page', options.page)
      .set('_limit', options.limit)

    return this.http.get<Array<ISleepTime>>(`${this.apiUrl}/sleepTimes`, {
      params,
    }).pipe(
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
