import Link from 'next/link'
import {useRouter} from 'next/router'

/**
 * 遷移先のquery配列を作る
 */
const createQuery = class {
  current: number
  all: number
  router: any

  constructor(router: any, current: number, all: number) {
    this.current = current
    this.all = all
    this.router = router
  }
  default(page: number) {
    const query = {...this.router.query}
    if (query.category !== undefined) {
      const category = query.category ? query.category as string[] : []
      const baseQuery = [...category].filter(v => !/(\d.?)/.test(v) && v !== 'page')
      query.category = (page > 1) ? [...baseQuery, 'page', page] : baseQuery
    }
    if (this.router.pathname === '/search') {
      if (page > 1) {
        query.p = page
      } else {
        delete query.p
      }
    }
    return query
  }
  prev() {
    return this.default(this.current - 1)
  }
  next() {
    return this.default(this.current + 1)
  }
}

const Pager = ({page}: {page: any}) => {
  // 現在のページから前後に表示するページ数
  const bothEndsCount = 1
  // ページ情報
  const current = Number(page.current)
  const all = Number(page.all)
  // リンク用query生成インスタンス
  const Query = new createQuery(useRouter(), current, all)

  const pagerConfig = []
  if (current > 1) {
    pagerConfig.push({
      query: Query.prev(),
      title: '« 前へ',
      class: 'prev'
    })
  }
  for (let i = 1; i <= all; i++) {
    // 現在ページ
    if (i === current) {
      pagerConfig.push({
        query: null,
        title: i,
        class: 'current'
      })
      continue
    }
    // 端から2番目はdot表示
    if ((i === 2 && current > bothEndsCount + 2) || (i === all - 1 && current + bothEndsCount + 1 < all)) {
      pagerConfig.push({
        query: null,
        title: '…',
        class: 'dots'
      })
      continue
    }
    // 両端と現在ページ付近以外は非表示
    if (i > 1 && i < all) {
      if (i < current - bothEndsCount || i > current + bothEndsCount) {
        continue
      }
    }
    // リンク
    pagerConfig.push({
      query: Query.default(i),
      title: i,
      class: null
    })
  }
  if (current !== all) {
    pagerConfig.push({
      query: Query.next(),
      title: '次へ »',
      class: 'next'
    })
  }

  if (all === 1) {
    return null
  }
  return (
    <div className='st-pagelink'>
      {pagerConfig.map((config, index) => {
        if (config.class === 'current') {
          return (
            <span key={index} className={'page-numbers ' + config.class} aria-current='page'>
              {config.title}
            </span>
          )
        }
        if (config.class === 'dots') {
          return (
            <span key={index} className={'page-numbers ' + config.class}>
              {config.title}
            </span>
          )
        }
        return (
          <Link key={index} href={{query: config.query}}>
            <a className='page-numbers'>{config.title}</a>
          </Link>
        )
      })}
    </div>
  )
}

export default Pager