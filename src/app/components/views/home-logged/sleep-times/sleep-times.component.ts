import {Component, OnInit} from '@angular/core';
import {ISleepTime} from "../../../../interfaces/isleep-time.Interface";
import {LocalStorageWorker} from "../../../../classes/localstorage-worker/local-storage-worker.class";
import {SleepTimeService} from "../../../../services/sleep-time.service";

@Component({
  selector: 'app-sleep-times',
  templateUrl: './sleep-times.component.html',
  styleUrls: ['./sleep-times.component.scss']
})
export class SleepTimesComponent implements OnInit {
  sleepTimes: ISleepTime[] = []
  requestPage = 0
  requestLimit = 10

  constructor(
    private localStorageWorker: LocalStorageWorker,
    private sleepTimeService: SleepTimeService
  ) {
    const currentUserId = localStorageWorker.getCurrentUserId()

    if (currentUserId) {
      this.sleepTimeService.getUserSleepTimes(currentUserId).subscribe((data) => {
        console.log(data)
      })
      // getUserSleepTimes(currentUserId,
      //   {
      //     '_sort': 'addDate',
      //     '_order': 'asc',
      //     '_page': this.requestPage,
      //     '_limit': this.requestLimit
      //   }
      // ).then(response => {
      //   if (response) {
      //     this.sleepTimes = response
      //   }
      // })
    }
  }

  ngOnInit(): void {
  }

}
