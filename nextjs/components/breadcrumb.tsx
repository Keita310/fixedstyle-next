import Link from 'next/link'
import {URLS} from 'const'

/**
 * カテゴリデータを取得
 * (子カテゴリは無視する)
 */
const getCategory = (categories: any) => {
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].parent > 0) {
      continue;
    }
    return {
      link: `${URLS.SITE}/${categories[i].slug}`,
      name: categories[i].name
    }
  }
}

/**
 * メインコンポーネント
 */
const Breadcrumb = ({post}: {post: any}) => {
  const category = getCategory(post.post_category)
  const items = [
    {link: URLS.SITE, name: 'HOME'},
    category,
    {link: `${category.link}/${post.post_name}`, name: post.post_title},
  ]
  const lastIndex = items.length - 1
  return (
    <section id="breadcrumb">
      <ol itemScope itemType="http://schema.org/BreadcrumbList">
        {items.map((item, i) => (
          <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem" key={i}>
            {lastIndex !== i ? (
              <>
                <Link href={item.link}>
                  <a itemProp="item"><span itemProp="name">{item.name}</span></a>
                </Link>
                &gt;
              </>
            ) : (
              <span itemProp="name">{item.name}</span>
            )}
            <meta itemProp="position" content={i + 1} />
          </li> 
        ))}
      </ol>
    </section>
  )
}

export default Breadcrumb