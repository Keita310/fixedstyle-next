import { rest } from 'msw'
import wpApi from './api/wpApi'

export const handlers = [
  // マッチしたURLが第二引数のメソッドを代わりに実行する
  rest.get(`${process.env.WP_REST_API}/wp-json/wp/v2/query`, wpApi),
]
