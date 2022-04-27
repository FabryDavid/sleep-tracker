import {Component, Input, OnInit} from '@angular/core';
import {SleepTime} from "../../../../classes/sleep-time/sleep-time.Class";
import * as moment from "moment";

@Component({
  selector: 'app-total-sleep-panel',
  templateUrl: './total-sleep-panel.component.html',
  styleUrls: ['./total-sleep-panel.component.scss']
})
export class TotalSleepPanelComponent implements OnInit {
  @Input() times: Array<SleepTime> = []

  constructor() {
  }

  ngOnInit(): void {
  }

  get totalSleepTime() {
    let duration = 0;
    this.times.forEach((time) => {
      duration = duration + moment.duration(time.getSleptTimeFormatted('HH:mm')).as('milliseconds')
    })
    return duration
  }
}
