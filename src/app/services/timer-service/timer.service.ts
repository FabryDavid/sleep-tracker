import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() {
  }

  private t: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  public s = this.t.asObservable()

  public startTimer() {
    // this.timerEmitter.emit(true)
    console.log('asd')
    this.t.next(true)
  }

  public stopTimer() {
    // this.timerEmitter.emit(false)

    console.log('ere')
    this.t.next(false)
  }

  public triggerEvent(value: boolean) {
    // this.timerEmitter.emit(value)
    this.t.next(value)
  }
}
