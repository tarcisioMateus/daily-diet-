// the input will always be from input<date>, input<time>
export function getTimeLineValueFromDateAndTime(
  date: string,
  time: string,
): string {
  // yyyy-mm-dd
  const date_ = date.split('-')

  const yearAsDays: number = Number(date_[0]) * 30 * 12
  const monthAsDays: number = Number(date_[1]) * 30
  const dateAsMinutes: number =
    (yearAsDays + monthAsDays + Number(date_[2])) * 24 * 60

  // hh:mm - 24h
  const time_ = time.split(':')

  const timeAsMinutes: number = Number(time_[0]) * 60 + Number(time_[1])

  const timeLineValue: string = String(dateAsMinutes + timeAsMinutes)
  return timeLineValue
}
