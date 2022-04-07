import {Pipe, PipeTransform} from "@angular/core";
import {SleepTime as ST} from "../classes/sleep-time/sleep-time.Class";

@Pipe({name: 'SleepTime'})
export class SleepTime implements PipeTransform {
  transform(value: string, stopTime: string): string {
    const sleepTime = new ST(new Date(`01/15/1970 ${value}`), new Date(`01/15/1970 ${stopTime}`))
    return sleepTime.getSleptTimeFormatted()
  }
}
