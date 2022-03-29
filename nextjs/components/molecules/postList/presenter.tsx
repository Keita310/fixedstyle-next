import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { faClock, faFolderOpen } from '@fortawesome/free-regular-svg-icons'
import { ListsTypes, ListTypes } from 'types/components/molecules/postList'

const list = (post: ListTypes, key: number) => {
  return (
    <dl className='clearfix' key={key}>
      <dt>
        <Link href={post.post_permalink}>
          <a>
            <img
              src={post.post_eyecatch.st_thumb150[0]}
              className='attachment-thumbnail size-thumbnail wp-post-image'
              alt={post.post_title}
              srcSet={
                post.post_eyecatch.st_thumb150[0] +
                ' ' +
                post.post_eyecatch.st_thumb150[1] +
                'w, ' +
                post.post_eyecatch.st_thumb100[0] +
                ' ' +
                post.post_eyecatch.st_thumb100[1] +
                'w'
              }
              sizes={
                '(max-width: ' +
                post.post_eyecatch.st_thumb150[1] +
                'px) 100vw, ' +
                post.post_eyecatch.st_thumb150[1] +
                'px'
              }
              width={post.post_eyecatch.st_thumb150[1]}
              height={post.post_eyecatch.st_thumb150[1]}
            />
          </a>
        </Link>
      </dt>
      <dd>
        <p className='kanren-t'>
          <Link href={post.post_permalink}>
            <a>{post.post_title}</a>
          </Link>
        </p>
        <div className='blog_info'>
          <p>
            <FontAwesomeIcon icon={faClock} />
            {post.post_created_at}&nbsp;
            <span className='pcone'>
              <FontAwesomeIcon icon={faFolderOpen} />
              <Link href={post.post_category[0].slug}>
                <a rel='category tag'>{post.post_category[0].name}</a>
              </Link>
              <br />
              {(() => {
                if (post.post_tags) {
                  return (
                    <>
                      <FontAwesomeIcon icon={faTags} />
                      &nbsp; リンクをwpのドメインへ向ける
                      <Link href={'tag/' + post.post_tags[0].slug}>
                        <a rel='tag'>{post.post_tags[0].name}</a>
                      </Link>
                    </>
                  )
                }
              })()}
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
  console.log(posts)
  let lists = ''
  if (posts.length) {
    lists = posts.map((post: ListTypes, index: number) => list(post, index))
  }
  return <div className='kanren'>{lists}</div>
}
export default Presenter
