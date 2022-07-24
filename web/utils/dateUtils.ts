import moment from 'moment'
// export const DateUtils = function() {}
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DateUtils {

  static format(time: number | string) {
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
  }

  // eslint-disable-next-line @typescript-eslint/no-dupe-class-members
  static format(time: number | string, format: string) {
    return moment(time).format(format)
  }

}
