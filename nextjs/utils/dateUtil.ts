/**
 * 日付文字列のフォーマット変換
 * 2022-03-23T19:30:19　→ 2021/02/27
 */
export function dateChangeFormat(date: string) {
  return date.replace(/(\d{4})-(\d{2})-(\d{2})(.*$)/, '$1/$2/$3')
}
