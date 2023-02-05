import Link from 'next/link'
import Img from 'components/img'
import {URLS} from 'const'

const Kanren = ({posts}: {posts: any}) => {
  return (
    <>
      <p className="point"><span className="point-in">関連記事</span></p>
      <div className="kanren">
        {posts.map((post, index) => (
          <dl key={index}>
            <dt>
              <Link href={URLS.SITE + post.post_permalink}>
                <a>
                  <Img post={post} />
                </a>
              </Link>
            </dt>
            <dd>
              <p className="kanren-t">
                <Link href={URLS.SITE + post.post_permalink}>
                  <a>{post.post_title}</a>
                </Link>
              </p>
              <div className="smanone2">
                <p>{post.post_excerpt}</p>
              </div>
            </dd>
          </dl>
        ))}
      </div>
    </>
  )
}

export default Kanren