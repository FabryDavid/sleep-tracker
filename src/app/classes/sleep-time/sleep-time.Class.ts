import {ISleepTime} from "../../interfaces/isleep-time.Interface";
import * as moment from "moment-timezone";
import {v4 as uuidv4} from 'uuid';
import durationFormatter from "../../helpers/durationFormatter";

export class SleepTime implements ISleepTime {
  constructor(
    public startTime: Date,
    public wakeupTime: Date,
    public userId: string | null = null,
    public addDate: Date = new Date(),
    public readonly id: string = '',
  ) {
    if (this.startTime.getTime() > this.wakeupTime.getTime()) {
      this.startTime.setDate(this.startTime.getDate() - 1)
    }

    if (!id || id === '') {
      this.id = uuidv4()
    }
  }

  getSleptTime(): moment.Moment {
    const start = moment(this.startTime)
    const end = moment(this.wakeupTime)
    const diff = moment(end.diff(start))

    return diff;
  }

  getSleptTimeFormatted(): string {
    return durationFormatter(this.getSleptTime().valueOf())
  }

  static timeToDate(time: string): Date {
    const today = new Date()

    if (!time || time === '') {
      return today
    }

    const [hours, minutes] = time.split(':')

    today.setHours(parseInt(hours))
    today.setMinutes(parseInt(minutes))
    today.setSeconds(0)

    return today
  }
}
