import {Component, Input, OnInit} from '@angular/core';
import {SleepTime} from "../../../../classes/sleep-time/sleep-time.Class";
import * as moment from "moment";

@Component({
  selector: 'app-total-sleep-panel',
  templateUrl: './total-sleep-panel.component.html',
  styleUrls: ['./total-sleep-panel.component.scss']
})
export class TotalSleepPanelComponent implements OnInit {
  @Input() tips: Array<SleepTime> = []

  constructor() {
  }

  ngOnInit(): void {
  }

  get totalSleepTime() {
    let duration = 0;
    this.tips.forEach((time) => {
      duration = duration + moment.duration(time.getSleptTimeFormatted('HH:mm')).as('milliseconds')
    })

    const hours = moment.duration(duration).asHours()
    const minutes = (hours - Math.floor(hours)) * 60
    return `${Math.floor(hours).toString().padStart(2, '0')}:${Math.round(minutes).toString().padStart(2, '0')}`
  }
}
