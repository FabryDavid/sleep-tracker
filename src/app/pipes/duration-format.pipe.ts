import {Pipe, PipeTransform} from '@angular/core';
import durationFormatter from "../helpers/durationFormatter";

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {
  transform(value: number): string {
    return durationFormatter(value)
  }
}
