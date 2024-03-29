import Link from 'next/link'
import {URLS} from 'const'
import Img from 'components/img'
import Categories from 'components/categories'
import Tags from 'components/atoms/tags'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faFolderOpen } from '@fortawesome/free-regular-svg-icons'
import { ListsTypes, ListTypes } from 'types/components/molecules/postList'
import { PostList } from './style'

const list = (post: ListTypes, key: number) => {
  return (
    <dl key={key}>
      <dt>
        <Link href={URLS.SITE + post.post_permalink}>
          <a>
            <Img post={post} />
          </a>
        </Link>
      </dt>
      <dd>
        <p className='kanren-t'>
          <Link href={URLS.SITE + post.post_permalink}>
            <a>{post.post_title}</a>
          </Link>
        </p>
        <div className='blog-info'>
          <p>
            <FontAwesomeIcon icon={faClock} />
            {post.post_created_at}&nbsp;
            <span className='pcone'>
              <FontAwesomeIcon icon={faFolderOpen} />&nbsp;
              <Categories categories={post.post_category} separate=", " /><br />
              <Tags tags={post.post_tags} />
            </span>
          </p>
        </div>
        <div className='smanone2'>
          <p
            dangerouslySetInnerHTML={{
              __html: post.post_excerpt,
            }}
          ></p>
        </div>
      </dd>
    </dl>
  )
}

const Presenter = ({ posts }: ListsTypes) => {
  let lists = ''
  if (posts.length) {
    lists = posts.map((post: ListTypes, index: number) => list(post, index))
  }
  return <PostList>{lists}</PostList>
}
export default Presenter
