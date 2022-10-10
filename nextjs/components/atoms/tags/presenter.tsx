import Link from 'next/link'
import {URLS} from 'const'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { TagsTypes, TagTypes } from 'types/components/atoms/tags'

const Presenter = ({ tags }: TagsTypes) => {
  const lastIndex = tags.length - 1
  if (lastIndex < 0) {
    return (<></>)
  }

  const links = tags.map((tag: TagTypes, index: number) => {
    return (
      <>
        <Link href={URLS.SITE + '/tag/' + tag.slug} key={index}>
          <a rel='tag'>{tag.name}</a>
        </Link>
        {lastIndex !== index && ', '}
      </>
    )
  })
  return (
    <>
      <FontAwesomeIcon icon={faTags} />&nbsp;
      {links}
    </>
  )
}
export default Presenter
