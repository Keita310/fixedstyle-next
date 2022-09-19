import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { TagsTypes, TagTypes } from 'types/components/atoms/tags'

const Presenter = ({ tags }: TagsTypes) => {
  const links = tags.map((tag: TagTypes, index: number) => {
    return (
      <Link href={process.env.SITE_URL + '/tag/' + tag.slug} key={index}>
        <a rel='tag'>{tag.name}</a>
      </Link>
    )
  })
  return (
    <>
      <FontAwesomeIcon icon={faTags} />
      &nbsp;
      {links}
    </>
  )
}
export default Presenter
