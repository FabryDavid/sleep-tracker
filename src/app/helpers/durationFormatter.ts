import * as moment from "moment";

export default function (value: number): string {
  const dur = moment.duration(value);
  const hours = Math.floor(dur.asHours());
  const mins = Math.floor(dur.asMinutes()) - hours * 60;
  const sec = Math.floor(dur.asSeconds()) - hours * 60 * 60 - mins * 60;
  return hours.toString().padStart(2, '0') + ":" + mins.toString().padStart(2, '0') + ":" + sec.toString().padStart(2, '0')

}
