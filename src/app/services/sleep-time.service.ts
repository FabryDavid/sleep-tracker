import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {ISleepTime} from "../interfaces/isleep-time.Interface";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SleepTimeService {
  private apiUrl = environment.apiUrl


  constructor(
    private http: HttpClient
  ) {
  }

  getUserSleepTimes(userId: string, options = {}): Observable<Array<ISleepTime>> {
    const params = new HttpParams()
      .set('userId', userId);

    // Object.keys(options).forEach((option) => {
    //   params.set(option, options[option])
    // })

    return this.http.get<Array<ISleepTime>>(`${this.apiUrl}/sleepTimes`, {
      params,
      headers: {
        'Content-Type': '*',
      },
    }).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError(this.handleError.bind(this))
    )
  }

  public handleError(err: HttpErrorResponse, caught: Observable<any>): Observable<any> {
    return throwError(err);
  }
}
