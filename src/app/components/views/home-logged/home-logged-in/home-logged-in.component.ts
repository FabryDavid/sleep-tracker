import {Component, OnInit} from '@angular/core';
import {SleepTimeService} from "../../../../services/sleep-time.service";
import {LocalStorageWorker} from "../../../../classes/localstorage-worker/local-storage-worker.class";
import {SleepTime} from "../../../../classes/sleep-time/sleep-time.Class";
import {RequestFilter} from "../../../../classes/request-filter/request-filter.Class";
import {RequestFilterOption} from "../../../../classes/request-filter-option/request-filter-option.Class";
import {TimeFilterEnum} from "../../../../enums/time-filter-enum.Enum";

@Component({
  selector: 'app-home-logged-in',
  templateUrl: './home-logged-in.component.html',
  styleUrls: ['./home-logged-in.component.scss']
})
export class HomeLoggedInComponent implements OnInit {
  timeFilter: TimeFilterEnum = TimeFilterEnum.last7days
  sleepTimes: SleepTime[] = []
  requestPage = 0
  requestLimit = 10
  currentUserId: string | null = null

  constructor(
    private localStorageWorker: LocalStorageWorker,
    private sleepTimeService: SleepTimeService,
  ) {
    this.currentUserId = localStorageWorker.getCurrentUserId()
  }

  ngOnInit(): void {
    this.loadSleepTimes()
  }

  public get TimeFilterEnum() {
    return TimeFilterEnum;
  }

  loadSleepTimes() {
    if (!this.currentUserId) {
      return
    }

    let gteDate = new Date()
    gteDate.setHours(0)
    gteDate.setMinutes(0)
    gteDate.setSeconds(0)
    gteDate.setMilliseconds(0)

    switch (this.timeFilter) {
      case TimeFilterEnum.last7days:
        gteDate.setDate(gteDate.getDate() - 7)
        break
      case TimeFilterEnum.thisMonth:
        gteDate.setDate(1)
        break
      case TimeFilterEnum.thisYear:
        gteDate.setDate(1)
        gteDate.setMonth(0)
        break
      default:
        return;
    }

    const filterOptions: Array<RequestFilterOption> = [
      new RequestFilterOption('startTime_gte', gteDate.toISOString()),
      new RequestFilterOption('startTime_lte', new Date().toISOString())
    ]
    const options = new RequestFilter('wakeupTime', 'desc', this.requestPage, this.requestLimit, filterOptions)

    this.sleepTimeService.filterSleepTimes(this.currentUserId, options).subscribe((data) => {
      this.sleepTimes = data

      this.sleepTimes = []
      data.forEach((item) => {
        const st = new SleepTime(new Date(item.startTime), new Date(item.wakeupTime), item.userId, new Date(item.addDate), item.id)
        this.sleepTimes.push(st)
      })
    })
  }
}
