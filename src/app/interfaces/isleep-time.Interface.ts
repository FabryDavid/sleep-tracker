import * as moment from 'moment';

export interface ISleepTime {
  startTime: Date
  wakeupTime: Date

  getSleptTime(): moment.Moment
  getSleptTimeFormatted():string
}
