import {Component, Input, OnInit} from '@angular/core';
import {SleepTime} from "../../../../classes/sleep-time/sleep-time.Class";

@Component({
  selector: 'app-sleep-time-panel',
  templateUrl: './sleep-time-panel.component.html',
  styleUrls: ['./sleep-time-panel.component.scss']
})
export class SleepTimePanelComponent implements OnInit {
  @Input() sleepTime!: SleepTime

  constructor() {
  }


  ngOnInit(): void {
    console.log(this.sleepTime)
    console.log(this.sleepTime.getSleptTime())
  }

}
