import {Component, Input, OnInit} from '@angular/core';
import {TimeFilterEnum} from "../../../../enums/time-filter-enum.Enum";
import {ChartData} from "../../../../classes/chart-data/chart-data.Class";
import durationFormatter from "../../../../helpers/durationFormatter";

@Component({
  selector: 'app-sleep-times-chart',
  templateUrl: './sleep-times-chart.component.html',
  styleUrls: ['./sleep-times-chart.component.scss']
})
export class SleepTimesChartComponent implements OnInit {
  @Input() chartValues: Array<Object> = []
  @Input() filterState: TimeFilterEnum = TimeFilterEnum.last7days

  constructor() {
  }

  ngOnInit(): void {
  }

  public get xAxisLabel() {
    switch (this.filterState) {
      case TimeFilterEnum.last7days:
        return 'Week Days'
      case TimeFilterEnum.thisMonth:
        return 'Days'
      case TimeFilterEnum.thisYear:
        return 'Months'
      default:
        return 'Date'
    }
  }

  formatAxis(val: number) {
    return durationFormatter(val)
  }
}
