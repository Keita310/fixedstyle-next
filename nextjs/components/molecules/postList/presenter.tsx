import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { faClock, faFolderOpen } from '@fortawesome/free-regular-svg-icons'
import { dateChangeFormat } from 'utils/dateUtil'
import { ListsTypes, ListTypes } from 'types/components/molecules/postList'

const list = (post: ListTypes, key: number) => {
  return (
    <dl className='clearfix' key={key}>
      <dt>
        <Link href={post.link}>
          <a>
            <img
              src='https://fixedstyle.net/wp-content/uploads/2014/09/chain_cut-150x150.jpg'
              className='attachment-thumbnail size-thumbnail wp-post-image'
              alt='チェーン交換'
              srcSet='https://fixedstyle.net/wp-content/uploads/2014/09/chain_cut-150x150.jpg 150w, https://fixedstyle.net/wp-content/uploads/2014/09/chain_cut-100x100.jpg 100w'
              sizes='(max-width: 150px) 100vw, 150px'
              width='150'
              height='150'
            />
          </a>
        </Link>
      </dt>
      <dd>
        <p className='kanren-t'>
          <Link href={post.link}>
            <a>{post.title.rendered}</a>
          </Link>
        </p>
        <div className='blog_info'>
          <p>
            <FontAwesomeIcon icon={faClock} />
            {dateChangeFormat(post.modified)}&nbsp;
            <span className='pcone'>
              <FontAwesomeIcon icon={faFolderOpen} />
              <a href='https://fixedstyle.net/customize/' rel='category tag'>
                カスタマイズ
              </a>
              <br />
              <FontAwesomeIcon icon={faTags} />
              &nbsp;
              <a href='https://fixedstyle.net/tag/%e3%83%81%e3%82%a7%e3%83%bc%e3%83%b3/' rel='tag'>
                チェーン
              </a>
            </span>
          </p>
        </div>
        <div className='smanone2'>
          <p
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          ></p>
        </div>
      </dd>
    </dl>
  )
}

const Presenter = ({ posts }: ListsTypes) => {
  console.log(posts)
  const lists = posts.map((post: ListTypes, index: number) => list(post, index))
  return <div className='kanren'>{lists}</div>
}
export default Presenter
