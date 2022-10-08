import Link from 'next/link'
import {URLS} from 'const'

const Breadcrumb = () => {
  const items = [
    {link: URLS.SITE, name: 'HOME'},
    {link: 'https://fixedstyle.net/customize/', name: 'カスタマイズ'},
    {link: 'http://localhost:3000/customize/change_seat', name: 'サドル(シート)の交換'},
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