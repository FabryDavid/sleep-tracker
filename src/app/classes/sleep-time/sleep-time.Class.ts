import {ISleepTime} from "../../interfaces/isleep-time.Interface";
import * as moment from "moment";
import {v4 as uuidv4} from 'uuid';

export class SleepTime implements ISleepTime {
  constructor(
    public startTime: Date,
    public wakeupTime: Date,
    public userId: string | null = null,
    public addDate: Date = new Date(),
    public readonly id: string = '',
  ) {
    if (startTime.getTime() > wakeupTime.getTime()) {
      startTime.setDate(startTime.getDate() - 1)
    }

    if (!id || id === '') {
      this.id = uuidv4()
    }
  }

  getSleptTime(): moment.Moment {
    const start = moment(this.startTime)
    const end = moment(this.wakeupTime)
    return moment(end.diff(start));
  }

  getSleptTimeFormatted(format='HH:mm'): string {
    return this.getSleptTime().format(format)
  }

  static timeToDate(time: string): Date {
    const today = new Date()

    if (!time || time === '') {
      return today
    }

    const [hours, minutes] = time.split(':')

    today.setHours(parseInt(hours))
    today.setMinutes(parseInt(minutes))

    return today
  }
}
