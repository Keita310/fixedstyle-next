import Link from 'next/link'
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
                  <img
                    width={post.post_eyecatch.st_thumb150[1]}
                    height={post.post_eyecatch.st_thumb150[2]} 
                    src={post.post_eyecatch.st_thumb150[0]}
                    className="attachment-thumbnail size-thumbnail wp-post-image"
                    alt={post.post_title}
                    srcSet={`${post.post_eyecatch.st_thumb150[0]} ${post.post_eyecatch.st_thumb150[1]}w,
                    ${post.post_eyecatch.st_thumb100[0]} ${post.post_eyecatch.st_thumb100[1]}w`}
                    sizes={`(max-width: ${post.post_eyecatch.st_thumb150[1]}px) 100vw, ${post.post_eyecatch.st_thumb150[1]}px`}
                  />
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