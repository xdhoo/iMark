import dayjs, { Dayjs } from 'dayjs'

const generatorMonth = (month: Date) => {
  const startOfMonth = dayjs(month).startOf('month')
  const endOfMonth = dayjs(month).endOf('month')

  const monthCalendar: Array<null | Dayjs>[] = []
  let week: Array<null | Dayjs> = []
  for (let i = 0; i < startOfMonth.day(); i++) {
    week.push(null)
  }

  for (
    let _date = startOfMonth;
    _date.isBefore(endOfMonth) || _date.isSame(endOfMonth);
    _date = _date.add(1, 'day')
  ) {
    week.push(_date)
    if (week.length === 7) {
      monthCalendar.push(week)
      week = []
    }
  }

  while (week.length < 7) {
    week.push(null)
  }

  monthCalendar.push(week)

  return monthCalendar
}

const generatorMonthList = (start: Date | string, end: Date | string): Dayjs[] => {
  let min = dayjs(start).set('date', 1)
  const max = dayjs(end).set('date', 2)
  const monthList = []
  while (min.isBefore(max)) {
    monthList.push(min)
    min = min.add(1, 'month')
  }

  return monthList
}

const transActiveMapping = (list: string[]) => {
  const activeMapping: { [key: number]: { [key: number]: { [key: number]: boolean } } } = {}
  list.forEach((item) => {
    const _dayjs = dayjs(item)
    const year = _dayjs.year()
    const month = _dayjs.month()
    const day = _dayjs.date()
    if (activeMapping.hasOwnProperty(year)) {
      if (activeMapping[year].hasOwnProperty(month)) {
        activeMapping[year][month][day] = true
      } else {
        activeMapping[year][month] = { [day]: true }
      }
    } else {
      activeMapping[year] = { [month]: { [day]: true } }
    }
  })
  return activeMapping
}

export default {
  generatorMonth,
  generatorMonthList,
  transActiveMapping
}
