import Link from 'next/link'
import {URLS} from 'const'

/**
 * メインコンポーネント
 */
 const Categories = ({
  categories,
  separate = undefined
}: {
  categories: any,
  separate: string | undefined
}) => {
  const lastIndex = categories.length - 1
  return (
    <>
      {categories.map((category, index) => (
        <>
          <Link href={`${URLS.SITE}/${category.slug}`}>
            <a title={`View all posts in ${category.name}`} rel="category tag">
              {category.name}
            </a>
          </Link>
          {(separate && lastIndex !== index) && (
            <>{separate}</>
          )}
        </>
      ))}
    </>
  )
}

export default Categories