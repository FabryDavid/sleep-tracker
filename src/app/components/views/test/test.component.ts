import {Component, OnInit} from '@angular/core';
import {TimerService} from "../../../services/timer-service/timer.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(
    private timerService: TimerService
  ) {
  }

  ngOnInit(): void {
    // this.timerService.s.subscribe(v => console.log(v))
  }

  start() {
    this.timerService.startTimer()
  }

  stop() {
    this.timerService.stopTimer()

  }
}
