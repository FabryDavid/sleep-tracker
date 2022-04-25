import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SleepTime} from "../../../../classes/sleep-time/sleep-time.Class";
import {SleepTimeService} from "../../../../services/sleep-time.service";

@Component({
  selector: 'app-sleep-time-panel',
  templateUrl: './sleep-time-panel.component.html',
  styleUrls: ['./sleep-time-panel.component.scss']
})
export class SleepTimePanelComponent implements OnInit {
  @Output() update: EventEmitter<null> = new EventEmitter<null>()

  @Input() sleepTime!: SleepTime

  constructor(
    private sleepTimeService: SleepTimeService
  ) {
  }


  ngOnInit(): void {
  }

  removeTime() {
    this.sleepTimeService.removeSleepTime(this.sleepTime.id).subscribe(() => {
      this.update.emit()
    })
  }
}
