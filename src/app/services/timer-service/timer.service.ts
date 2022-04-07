import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerBehavior: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  public timerBehavior$ = this.timerBehavior.asObservable()

  constructor() {
  }

  public startTimer() {
    this.timerBehavior.next(true)
  }

  public stopTimer() {
    this.timerBehavior.next(false)
  }
}
