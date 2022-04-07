import {Component, OnInit} from '@angular/core';
import {TimerService} from "../../../../../services/timer-service/timer.service";

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent implements OnInit {

  constructor(
    private timerService: TimerService
  ) {
  }

  ngOnInit(): void {
    this.timerService.s.subscribe(v => console.log(v))
  }

}
