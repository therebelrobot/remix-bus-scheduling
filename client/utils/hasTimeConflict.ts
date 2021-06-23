import {Route} from '_/state'

export const hasTimeConflict = (x: Route, y: Route): boolean => {
  if (
    /**
     *  x       :            |-----------------------|
     *  y       : |---------------------|
     */
    (x.startTime < y.endTime && x.startTime > y.startTime) ||
    /**
     *  x       : |-----------------------|
     *  y       :            |---------------------|
     */
    (x.endTime > y.startTime && x.endTime < y.endTime) ||
    /**
     *  x       :     |-------------|
     *  y       : |---------------------|
     */
    (x.startTime > y.startTime && x.endTime < y.endTime) ||
    /**
     *  x       : |---------------------|
     *  y       :     |-------------|
     */
    (x.startTime < y.startTime && x.endTime > y.endTime) ||
    /**
     *  x       : |-------------|
     *  y       : |---------------------|
     */
    (x.startTime == y.startTime && x.endTime < y.endTime) ||
    /**
     *  x       : |---------------------|
     *  y       : |-------------|
     */
    (x.startTime == y.startTime && x.endTime > y.endTime) ||
    /**
     *  x       :         |-------------|
     *  y       : |---------------------|
     */
    (x.startTime > y.startTime && x.endTime == y.endTime) ||
    /**
     *  x       : |---------------------|
     *  y       :         |-------------|
     */
    (x.startTime < y.startTime && x.endTime == y.endTime) ||
    /**
     *  x       : |---------------------|
     *  y       : |---------------------|
     */
    (x.startTime == y.startTime && x.endTime == y.endTime)
  ) {
    return true
  } else {
    return false
  }
}
