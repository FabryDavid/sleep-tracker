import {Component, OnInit} from '@angular/core';
import {SleepTimeService} from "../../../../services/sleep-time.service";
import {LocalStorageWorker} from "../../../../classes/localstorage-worker/local-storage-worker.class";
import {SleepTime} from "../../../../classes/sleep-time/sleep-time.Class";
import {RequestFilter} from "../../../../classes/request-filter/request-filter.Class";
import {RequestFilterOption} from "../../../../classes/request-filter-option/request-filter-option.Class";
import {TimeFilterEnum} from "../../../../enums/time-filter-enum.Enum";
import {ChartData} from "../../../../classes/chart-data/chart-data.Class";

@Component({
  selector: 'app-home-logged-in',
  templateUrl: './home-logged-in.component.html',
  styleUrls: ['./home-logged-in.component.scss']
})
export class HomeLoggedInComponent implements OnInit {
  timeFilter: TimeFilterEnum = TimeFilterEnum.last7days
  sleepTimes: SleepTime[] = []
  currentUserId: string | null = null
  chartValues: Array<Object> = []

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

  timeFilterChange() {
    this.loadSleepTimes()
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
    const options = new RequestFilter('wakeupTime', 'desc', null, null, filterOptions)

    this.sleepTimeService.filterSleepTimes(this.currentUserId, options).subscribe((data) => {
      const items = data.body
      this.sleepTimes = items

      const sleepTimes: SleepTime[] = []
      const chartData: Array<ChartData> = []
      items.forEach((item: SleepTime) => {
        const st = new SleepTime(new Date(item.startTime), new Date(item.wakeupTime), item.userId, new Date(item.addDate), item.id)
        sleepTimes.push(st)

        let name: string;

        switch (this.timeFilter) {
          case TimeFilterEnum.last7days:
            name = st.wakeupTime.toLocaleDateString('en-US', {
              weekday: 'short'
            })
            break
          case TimeFilterEnum.thisMonth:
            name = st.wakeupTime.toLocaleDateString('en-US', {
              day: '2-digit'
            })
            break
          case TimeFilterEnum.thisYear:
            name = st.wakeupTime.toLocaleDateString('en-US', {
              month: 'short'
            })
            break
          default:
            name = st.wakeupTime.toLocaleDateString()
            return;
        }

        const nameIndex = chartData.filter((x) => x.name === name).map((x) => x.name).indexOf(name)

        const sleptValue = st.getSleptTime().valueOf()

        if (nameIndex === -1) {
          chartData.push({
            name: name,
            value: sleptValue
          })
        } else {
          chartData[nameIndex].value += sleptValue
        }

        console.log(st)
        console.log(st.getSleptTime())
        console.log(sleptValue)
        console.log('========')
      })

      this.sleepTimes = sleepTimes
      this.chartValues = [
        {
          name: "Slept time",
          series: chartData.reverse(),
        },
      ]

      console.log('Sleep times:')
      console.table(chartData.reverse())
    })
  }
}
