import {ISleepTime} from "../../interfaces/isleep-time.Interface";
import * as moment from "moment";

export class SleepTime implements ISleepTime {
  constructor(
    public startTime: Date,
    public wakeupTime: Date,
  ) {
    if (startTime.getTime() > wakeupTime.getTime()) {
      startTime.setDate(startTime.getDate() - 1)
    }
  }

  getSleptTime(): moment.Moment {
    const start = moment(this.startTime)
    const end = moment(this.wakeupTime)
    return moment(end.diff(start));
  }

  getSleptTimeFormatted(): string {
    return this.getSleptTime().subtract('01:00:00').format('HH:mm')
  }
}
