/**
 * 「The error below may be caused by using the wrong test environment」エラー対策でこのコメントが必要
 * @jest-environment jsdom
 */
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import * as renderer from 'react-test-renderer'
import Index from './index'
import { TagsTypes } from 'types/components/atoms/tags'

describe('グループ分け1', () => {
  let container: any = null

  // セットアップ
  beforeEach(() => {
    // documentにDOM要素を描画する
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  // クリーンアップ
  afterEach(() => {
    // documentからDOM要素を削除する
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })

  // テストの括り
  it('引数が空の時', () => {
    // renderする場合actで囲う
    act(() => {
      // 変数に入れないで@testing-library/react'のscreenで取得できるかも？
      render(<Index />, container)
    })
    // 文字列として比較
    expect(container.innerHTML).toBe('')
  })

  // 正常な引数
  const props: array = [
    { slug: 'ハンドル', name: 'ハンドル' },
    { slug: 'タイヤ', name: 'タイヤ' },
  ]

  // テストの括り
  it('正常な引数', () => {
    // renderする場合actで囲う
    act(() => {
      render(<Index tags={props} />, container)
    })
    // 文字列として比較(マッチャーのtoMatchは部分一致。正規表現も使える)
    expect(container.innerHTML).toMatch('タイヤ')
  })

  // テストの括り
  it('スナップショットテスト', () => {
    const tree = renderer.create(<Index tags={props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
