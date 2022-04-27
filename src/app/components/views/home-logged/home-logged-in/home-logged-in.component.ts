import {Component, OnInit} from '@angular/core';
import {SleepTimeService} from "../../../../services/sleep-time.service";
import {LocalStorageWorker} from "../../../../classes/localstorage-worker/local-storage-worker.class";
import {SleepTime} from "../../../../classes/sleep-time/sleep-time.Class";
import {RequestFilter} from "../../../../classes/request-filter/request-filter.Class";
import {RequestFilterOption} from "../../../../classes/request-filter-option/request-filter-option.Class";
import {TimeFilterEnum} from "../../../../enums/time-filter-enum.Enum";
import {ChartData} from "../../../../classes/chart-data/chart-data.Class";
import durationFormatter from "../../../../helpers/durationFormatter";

@Component({
  selector: 'app-home-logged-in',
  templateUrl: './home-logged-in.component.html',
  styleUrls: ['./home-logged-in.component.scss']
})
export class HomeLoggedInComponent implements OnInit {
  timeFilter: TimeFilterEnum = TimeFilterEnum.last7days
  sleepTimes: SleepTime[] = []
  currentUserId: string | null = null
  columns = [
    {
      columnDef: 'time',
      header: 'Time',
      cell: (element: SleepTime) => `${this.getSleepInterval(element)}`,
    },
    {
      columnDef: 'amount',
      header: 'Amount',
      cell: (element: SleepTime) => `${element.getSleptTime().format('HH:mm:ss')}`,
    },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);

  // Chart
  chartValues: Array<Object> = [];
  xAxisLabel = 'Date'


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
    const options = new RequestFilter('wakeupTime', 'asc', null, null, filterOptions)

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
            this.xAxisLabel = 'Week Days'
            break
          case TimeFilterEnum.thisMonth:
            name = st.wakeupTime.toLocaleDateString('en-US', {
              day: '2-digit'
            })
            this.xAxisLabel = 'Days'
            break
          case TimeFilterEnum.thisYear:
            name = st.wakeupTime.toLocaleDateString('en-US', {
              month: 'short'
            })
            this.xAxisLabel = 'Months'
            break
          default:
            name = st.wakeupTime.toLocaleDateString()
            this.xAxisLabel = 'Date'
            return;
        }

        const nameIndex = chartData.filter((x) => x.name === name).map((x) => x.name).indexOf(name)
        if (nameIndex === -1) {
          chartData.push({
            name: name,
            value: st.getSleptTime()
          })
        } else {
          chartData[nameIndex].value.add(st.getSleptTime())
        }
      })

      this.sleepTimes = sleepTimes
      this.chartValues = [
        {
          name: "Slept time",
          series: chartData,
        },
      ]
    })
  }

  formatAxis(val: number) {
    return durationFormatter(val)
  }
}
