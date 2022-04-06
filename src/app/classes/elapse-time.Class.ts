export class ElapseTime {
  constructor(
    public days: Number,
    public hours: Number,
    public minutes: Number,
    public seconds: Number,
  ) {
  }

  getFormattedString() {
    let formatted = ""
    if (this.days > 0) {
      formatted += `${this.days} day, `
    }
    formatted += `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`

    return formatted
  }
}
