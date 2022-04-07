import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageWorker} from "../../../../classes/localstorage-worker/local-storage-worker.class";
import {ElapseTime} from "../../../../classes/elapse-time.Class";
import {interval, Subscription} from "rxjs";
import {tap} from "rxjs/operators";
import {TimerService} from "../../../../services/timer-service/timer.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  timerStarted: Date | null = null
  timeElapsed = new ElapseTime(0, 0, 0, 0)
  source = interval(1000)
  subscription: Subscription | undefined

  constructor(
    private timerService: TimerService
  ) {
    this.timerStarted = LocalStorageWorker.getTimer()
    this.timerService.s.pipe(
      tap(v => console.log(v))
    ).subscribe({
      next: (value => {
        console.log(value)
        this.setTimer()
      })
    })
    // TimerService.timerEmitter.subscribe((value) => {
    //   this.setTimer()
    // })
  }

  ngOnInit(): void {
  }

  load() {
    // this.timerService.t.subscribe({
    //   next: (value => {
    //     this.setTimer()
    //   })
    // })
  }

  setElapsedTime() {
    if (!this.timerStarted) {
      return;
    }

    const today = new Date()
    const difference = new Date(today.getTime() - this.timerStarted.getTime()).getTime()

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    this.timeElapsed.days = days
    this.timeElapsed.hours = hours
    this.timeElapsed.minutes = minutes
    this.timeElapsed.seconds = seconds
  }

  setTimer() {
    this.timerStarted = LocalStorageWorker.getTimer()

    console.log(this.timerStarted)

    if (this.timerStarted) {
      this.subscription = this.source.pipe(
        tap(_ => this.setElapsedTime())
      ).subscribe();
    } else {
      if (this.subscription) {
        this.subscription.unsubscribe()
      }

      this.timeElapsed.days = 0
      this.timeElapsed.hours = 0
      this.timeElapsed.minutes = 0
      this.timeElapsed.seconds = 0
    }
  }

  startTimer() {
    this.timerStarted = LocalStorageWorker.startTimer()
  }

  stopTimer() {
    this.timerStarted = LocalStorageWorker.stopTimer()
  }

  ngOnDestroy() {
    // TimerService.timerEmitter.unsubscribe()
  }
}
