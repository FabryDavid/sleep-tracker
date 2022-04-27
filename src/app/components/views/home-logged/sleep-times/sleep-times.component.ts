import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SleepTime} from "../../../../classes/sleep-time/sleep-time.Class";

@Component({
  selector: 'app-sleep-times',
  templateUrl: './sleep-times.component.html',
  styleUrls: ['./sleep-times.component.scss']
})
export class SleepTimesComponent implements OnInit {
  @Output() update: EventEmitter<null> = new EventEmitter<null>()
  @Input() sleepTimes: SleepTime[] = []

  constructor() {
  }

  ngOnInit(): void {
  }
}
