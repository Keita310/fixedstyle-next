import Link from 'next/link'
import {URLS} from 'const'
import {getCategory} from 'utils'

/**
 * メインコンポーネント
 */
const Breadcrumb = ({post}: {post: any}) => {
  const category = getCategory(post.post_category, true)
  const items = [
    {link: URLS.SITE, name: 'HOME'},
    category,
    {link: URLS.SITE + post.post_permalink, name: post.post_title},
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