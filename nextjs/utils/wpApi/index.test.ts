/**
 * 「The error below may be caused by using the wrong test environment」エラー対策でこのコメントが必要
 * @jest-environment jsdom
 */
import { getPosts } from './index'
import { server } from './../../mocks/server'

describe('グループ化１', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('最新記事正常取得', async () => {
    const res = await getPosts()
    const post = res.posts[0]
    expect(post.post_permalink).toBe('https://fixedstyle.net/customize/change_seat/')
    expect(post.post_title).toBe('サドル(シート)の交換')
    expect(post.post_eyecatch.st_thumb150[0]).toBe(
      'https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top-150x150.jpg'
    )
    expect(post.post_eyecatch.st_thumb150[1]).toBe(150)
    expect(post.post_created_at).toBe('2022/01/03')
    expect(post.post_category[0].slug).toBe('customize')
    expect(post.post_category[0].name).toBe('カスタマイズ')
    expect(post.post_tags).toBe(false)
    expect(post.post_excerpt).toBe(
      'お尻が痛い、見た目を変えてみたい！という方に簡単おすすめのカスタマイズ 「サドル交換」を実践してみましょう！ シートポストにもよりますが大半は六角レンチだけあれば交換できます。 六角レンチは100均で ... '
    )
  })
})
