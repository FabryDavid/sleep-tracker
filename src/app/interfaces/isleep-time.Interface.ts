import * as moment from 'moment';

export interface ISleepTime {
  readonly id: string
  userId: string | null
  startTime: Date
  wakeupTime: Date
  addDate:Date

  getSleptTime(): moment.Moment

  getSleptTimeFormatted(): string
}
