import dayjs from 'dayjs'

export const getMinuteTime = (min: number) =>
  dayjs().hour(0).minute(0).add(min, 'minutes').format('h:mm a')
