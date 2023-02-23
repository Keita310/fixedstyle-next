import Link from 'next/link'
import {useRouter} from 'next/router'

const Pager = ({page}: {page: any}) => {
  // 現在のページから前後に表示するページ数
  const bothEndsCount = 1
  // リンク用query配列
  const router = useRouter()
  const query = router.query.category ? router.query.category as string[] : []
  const baseQuery = [...query].filter(v => !/(\d.?)/.test(v) && v !== 'page')
  const basePageQuery = [...baseQuery, 'page']
  const prevQuery = page.current > 2 ? [...basePageQuery, page.current - 1] as string[] : baseQuery
  const nextQuery = [...basePageQuery, page.current + 1] as string[]

  const pagerConfig = []
  if (page.current > 1) {
    pagerConfig.push({
      query: prevQuery,
      title: '« 前へ',
      class: 'prev'
    })
  }
  for (let i = 1; i <= page.all; i++) {
    // 現在ページ
    if (i === page.current) {
      pagerConfig.push({
        query: null,
        title: i,
        class: 'current'
      })
      continue
    }
    // 端から2番目はdot表示
    if ((i === 2 && page.current > bothEndsCount + 2) || (i === page.all - 1 && page.current + bothEndsCount + 1 < page.all)) {
      pagerConfig.push({
        query: null,
        title: '…',
        class: 'dots'
      })
      continue
    }
    // 両端と現在ページ付近以外は非表示
    if (i > 1 && i < page.all) {
      if (i < page.current - bothEndsCount || i > page.current + bothEndsCount) {
        continue
      }
    }
    // リンク
    pagerConfig.push({
      query: i > 1 ? [...basePageQuery, i] : baseQuery,
      title: i,
      class: null
    })
  }
  if (page.current !== page.all) {
    pagerConfig.push({
      query: nextQuery,
      title: '次へ »',
      class: 'next'
    })
  }

  if (page.all === 1) {
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
          <Link key={index} href={{query: {category: config.query as string[]}}}>
            <a className='page-numbers'>{config.title}</a>
          </Link>
        )
      })}
    </div>
  )
}

export default Pager