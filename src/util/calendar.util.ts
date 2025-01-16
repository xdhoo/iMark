import dayjs, { Dayjs } from 'dayjs'
import type { ActiveDateMap } from 'types'

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
  const max = dayjs(end).set('month', 11).set('date', 2)
  const monthList = []
  while (min.isBefore(max)) {
    monthList.push(min)
    min = min.add(1, 'month')
  }

  return monthList
}

const transActiveMapping = (list: string[]) => {
  const activeMapping: ActiveDateMap = {}
  list.forEach((item) => {
    const _dayjs = dayjs(item)
    const year = _dayjs.year()
    const month = _dayjs.month()
    const day = _dayjs.date()
    if (Object.prototype.hasOwnProperty.call(activeMapping, year)) {
      if (Object.prototype.hasOwnProperty.call(activeMapping[year], month)) {
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

const generatorDateList = (start: Date | string, end: Date | string) => {
  const dateList: Dayjs[] = []
  let min = dayjs(start)
  const max = dayjs(end)
  while (min.isBefore(max)) {
    dateList.push(min)
    min = min.add(1, 'day')
  }
  return dateList
}

const generatorDayList = (start: Date | string, end: Date | string) => {
  let min = dayjs(start).set('date', 1)
  const max = dayjs(end)
  const dayList: { yearTag?: Dayjs; chunk: Dayjs[] }[] = []
  let chunk: Dayjs[] = []
  let yearTag
  while (min.isBefore(max)) {
    if (min.month() === 0 && min.date() === 1) yearTag = min
    chunk.push(min)
    if (chunk.length === 14) {
      dayList.push({ yearTag, chunk })
      chunk = []
      yearTag = undefined
    }
    min = min.add(1, 'day')
  }
  if (chunk.length) {
    dayList.push({ yearTag, chunk })
  }
  return dayList
}

export default {
  generatorMonth,
  generatorMonthList,
  transActiveMapping,
  generatorDateList,
  generatorDayList
}
