import {Component, OnInit} from '@angular/core';
import {LocalStorageWorker} from "../../../../classes/localstorage-worker/local-storage-worker.class";
import {SleepTimeService} from "../../../../services/sleep-time.service";
import {RequestOptions} from "../../../../classes/request-options/request-options.Class";
import {SleepTime} from "../../../../classes/sleep-time/sleep-time.Class";

@Component({
  selector: 'app-sleep-times',
  templateUrl: './sleep-times.component.html',
  styleUrls: ['./sleep-times.component.scss']
})
export class SleepTimesComponent implements OnInit {
  sleepTimes: SleepTime[] = []
  requestPage = 0
  requestLimit = 4
  currentUserId: string | null = null

  constructor(
    private localStorageWorker: LocalStorageWorker,
    private sleepTimeService: SleepTimeService
  ) {
    this.currentUserId = localStorageWorker.getCurrentUserId()

    this.loadSleepTimes()
  }

  ngOnInit(): void {
  }

  loadSleepTimes() {
    if (this.currentUserId) {
      const options = new RequestOptions('wakeupTime', 'desc', this.requestPage, this.requestLimit)

      this.sleepTimeService.getUserSleepTimes(this.currentUserId, options).subscribe((data) => {
        this.sleepTimes = []
        data.forEach((item) => {
          const st = new SleepTime(new Date(item.startTime), new Date(item.wakeupTime), item.userId, new Date(item.addDate), item.id)
          this.sleepTimes.push(st)
        })
      })
    }
  }

}
