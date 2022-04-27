import {Component, Input, OnInit} from '@angular/core';
import {SleepTime} from "../../../../classes/sleep-time/sleep-time.Class";

@Component({
  selector: 'app-sleep-times-table',
  templateUrl: './sleep-times-table.component.html',
  styleUrls: ['./sleep-times-table.component.scss']
})
export class SleepTimesTableComponent implements OnInit {
  @Input() times: Array<SleepTime> = []

  columns = [
    {
      columnDef: 'time',
      header: 'Time',
      cell: (element: SleepTime) => `${this.getSleepInterval(element)}`,
    },
    {
      columnDef: 'amount',
      header: 'Amount',
      cell: (element: SleepTime) => `${element.getSleptTimeFormatted()}`,
    },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);

  constructor() {
  }

  ngOnInit(): void {
  }

  getSleepInterval(sleepTime: SleepTime) {
    let intervalString = `${sleepTime.startTime.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit'
    })}`

    if (sleepTime.startTime.getDate() === sleepTime.wakeupTime.getDate()) {
      intervalString += ` - ${sleepTime.wakeupTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        hour12: false,
        minute: '2-digit'
      })}`
    } else {
      intervalString += ` - ${sleepTime.wakeupTime.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        hour12: false,
        minute: '2-digit'
      })}`
    }

    return intervalString
  }

}
