import {Component, OnInit} from '@angular/core';
import {LocalStorageWorker} from "../../../../classes/localstorage-worker/local-storage-worker.class";
import {ElapseTime} from "../../../../classes/elapse-time.Class";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  timerStarted: Date | null = null
  timeElapsed = new ElapseTime(0, 0, 0, 0)


  constructor() {
    this.timerStarted = LocalStorageWorker.getTimer()
    if (this.timerStarted) {
      this.setElapsedTime()
    }
  }

  ngOnInit(): void {
  }

  setElapsedTime() {
    if (!this.timerStarted) {
      this.timerStarted = LocalStorageWorker.getTimer() ? LocalStorageWorker.getTimer() : new Date()
    }

    if (!this.timerStarted) {
      return
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

    setInterval(this.setElapsedTime.bind(this), 1000)
  }

  startTimer() {
    this.timerStarted = LocalStorageWorker.startTimer()
    if (this.timerStarted) {
      this.setElapsedTime()
    }
  }

  stopTimer() {
    this.timerStarted = LocalStorageWorker.stopTimer()
    if (this.timerStarted) {
      this.setElapsedTime()
    }
  }
}
