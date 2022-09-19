import Link from 'next/link'

const PostList = ({posts}: {posts: any}) => {
  return (
    <div className="kanren">
      {posts.map((post) => item(post))}
    </div>
  )
}

const item = (post: any) => {
  return (
    <dl className="clearfix">
      <dt>
        <Link href={post.link}>
          <a>
            <img width="150" height="150" src="" />
          </a>
        </Link>
      </dt>
      <dd>
        <p className="kanren-t">
          <Link href={post.link}>
            <a>{post.title.rendered}</a>
          </Link>
        </p>
        <div className="blog_info">
          <p>
            <i className="fa fa-clock-o"></i> {post.date} &nbsp;
            <span className="pcone">
              <i className="fa fa-folder-open-o" aria-hidden="true"></i>-<a href="https://fixedstyle.net/customize/" rel="category tag">カスタマイズ</a><br/>
            </span>
          </p>
        </div>
        <div
          className="smanone2"
          dangerouslySetInnerHTML={{
            __html: post.excerpt.rendered
          }}
        />
      </dd>
    </dl>
  )
}

export default PostList