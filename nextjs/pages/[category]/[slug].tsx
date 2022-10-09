import Link from 'next/link'
import {URLS} from 'const'
import Layout from 'components/layout'
import Breadcrumb from 'components/breadcrumb'
import AdSense from 'components/adSense'
import PrevNext from 'components/prevNext'
import Kanren from 'components/kanren'
import Sns from 'components/sns'
import {getPost} from 'utils/wpApi'
import {dispYYYYMD, dateFormat} from 'utils/date'

/**
 * 投稿/更新日
 */
 const PostDate = ({post}: {post: any}) => {
  return (
    <p>
      <span className="kdate">
        投稿日：
        {post.post_date !== post.post_modified && (
          <>{dispYYYYMD(post.post_date)} 更新日：</>
        )}
        <time className="updated" dateTime={dateFormat(post.post_modified)}>{dispYYYYMD(post.post_modified)}</time>
      </span>
    </p>
  )
}

/**
 * カテゴリラベル
 */
const CategoryLabel = ({categories}: {categories: any}) => {
  return (
    <p className="st-catgroup">
      {categories.map((category) => (
        <Link href={`${URLS.SITE}/${category.slug}`}>
          <a title={`View all posts in ${category.name}`} rel="category tag">
            <span className="catname st-catid4">{category.name}</span>
          </a>
        </Link>
      ))}
    </p>
  )
}

/**
 * メイン
 */
function Post({post}: {post: any}) {
  console.log(post)

  return (
    <Layout>
      <Breadcrumb post={post} />

      <div
        id={`post-${post.ID}`}
        className={`st-post post-${post.ID} post type-post status-publish format-standard has-post-thumbnail hentry`}
      >
        <article>
          <CategoryLabel categories={post.post_category} />
          <h2 className="entry-title">{post.post_title}</h2>
          <div className="blogbox">
            <PostDate post={post} />
          </div>
          <div className="mainbox">
            <div className="entry-content">
              <div id="content">
                <div className="eyecatch">
                  <img width="800" height="613" src="https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top.jpg" className="attachment-full size-full wp-post-image" alt="ピストシート交換" srcSet="https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top.jpg 800w, https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top-300x230.jpg 300w, https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top-768x588.jpg 768w" sizes="(max-width: 800px) 100vw, 800px" />
                </div>
                <AdSense />
                <div dangerouslySetInnerHTML={{ __html: post.post_content}} />
              </div>
            </div>
            <AdSense />
          </div>
          <Sns />
          <p className="tagst"> <i className="fa fa-folder-open-o" aria-hidden="true"></i>-<a href="https://fixedstyle.net/customize/" rel="category tag">カスタマイズ</a><br/> </p>
        </article>

        <div className="st-aside">
          <PrevNext />
          <Kanren />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths () {
  return {
    // 静的生成するページリストをここで定義する。APIで取得するように調整
    paths: [
      { params: { category: 'customize', slug: 'change_seat' } },
      { params: { category: 'beginner', slug: 'about_pist' } },
    ],
    fallback: false,
  }
}


export async function getStaticProps({params}) {
  const post = await getPost(params.slug)
  return {
    props: {
      post: post
    },
  }
}

export default Post