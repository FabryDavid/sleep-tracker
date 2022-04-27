import {Component, Input, OnInit} from '@angular/core';
import {SleepTime} from "../../../../classes/sleep-time/sleep-time.Class";
import * as moment from "moment";

@Component({
  selector: 'app-avg-sleep-panel',
  templateUrl: './avg-sleep-panel.component.html',
  styleUrls: ['./avg-sleep-panel.component.scss']
})
export class AvgSleepPanelComponent implements OnInit {
  @Input() times: Array<SleepTime> = []

  constructor() {
  }

  ngOnInit(): void {
  }

  get avgSleepTime() {
    let duration = 0;
    this.times.forEach((time) => {
      duration = duration + moment.duration(time.getSleptTimeFormatted('HH:mm')).as('milliseconds')
    })

    duration /= this.times.length
    return duration
  }
}
