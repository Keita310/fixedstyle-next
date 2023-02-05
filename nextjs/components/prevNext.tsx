import Link from 'next/link'
import Img from 'components/img'
import {URLS} from 'const'

const Li = ({post, className}: {post: any, className: string}) => {
  return (
    <li className={className}>
      <Link href={URLS.SITE + post.post_permalink}>
        <a>
          <Img post={post} />
          {/*<img src="https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top-100x100.jpg" className="attachment-st_thumb100 size-st_thumb100 wp-post-image" alt="ピストシート交換" srcSet="https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top-100x100.jpg 100w, https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top-150x150.jpg 150w" sizes="(max-width: 100px) 100vw, 100px" width="100" height="100" />*/}
          <p>{post.post_title}</p>
        </a>
      </Link>
    </li>
  )
}

const PrevNext = ({posts}: {posts: any}) => {
  return (
    <nav className="prev-next">
      <ul>
        {posts.prev && (<Li className="prev" post={posts.prev} />)}
        {posts.next && (<Li className="next" post={posts.next} />)}
      </ul>
    </nav>
  )
}

export default PrevNext