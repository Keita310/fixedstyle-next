import baseDayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

// 日本語指定
baseDayjs.locale('ja')
// タイムゾーン指定
baseDayjs.extend(utc)
baseDayjs.extend(timezone)
baseDayjs.tz.setDefault('Asia/Tokyo')

/**
 * カスタム設定をしたdayjsを返す
 */
export function dayjs(date: string | undefined = undefined) {
  return baseDayjs(date)
}

/**
 * 指定フォーマットで日付を返す
 */
export function dateFormat(
  date: string | undefined = undefined,
  format: string | undefined = undefined
): string {
  // date指定がない場合はtz指定する
  if (date === undefined) {
    return dayjs().tz().format(format)
  }
  return dayjs(date).format(format)
}

/**
 * YYYY年M月D日
 */
export function dispYYYYMD(date: string | undefined = undefined): string {
  return dateFormat(date, 'YYYY年M月D日')
}