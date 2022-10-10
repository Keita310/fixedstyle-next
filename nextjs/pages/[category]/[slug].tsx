import Layout from 'components/layout'
import Breadcrumb from 'components/breadcrumb'
import AdSense from 'components/adSense'
import PrevNext from 'components/prevNext'
import Kanren from 'components/kanren'
import Sns from 'components/sns'
import Categories from 'components/categories'
import Tags from 'components/atoms/tags'
import {getCategory} from 'utils'
import {getPost, getAllPosts} from 'utils/wpApi'
import {dispYYYYMD, dateFormat} from 'utils/date'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolderOpen} from '@fortawesome/free-regular-svg-icons'

/**
 * アイキャッチ画像
 */
const Eyecatch = ({post}: {post: any}) => {
  return (
    <div className="eyecatch">
      <img
        width={post.post_eyecatch.full[1]}
        height={post.post_eyecatch.full[2]}
        src={post.post_eyecatch.full[0]}
        className="attachment-full size-full wp-post-image"
        alt={post.post_title}
        srcSet={`${post.post_eyecatch.full[0]} ${post.post_eyecatch.full[1]}w,
        ${post.post_eyecatch.st_thumb500[0]} ${post.post_eyecatch.st_thumb500[1]}w`}
        sizes={`(max-width: ${post.post_eyecatch.full[1]}px) 100vw, ${post.post_eyecatch.full[1]}px`}
      />
    </div>
  )
}


/**
 * 投稿/更新日
 */
const PostDate = ({post}: {post: any}) => {
  return (
    <p className="kdate">
      投稿日：
      {post.post_date !== post.post_modified && (
        <>{dispYYYYMD(post.post_date)} 更新日：</>
      )}
      <time className="updated" dateTime={dateFormat(post.post_modified)}>{dispYYYYMD(post.post_modified)}</time>
    </p>
  )
}

/**
 * メイン
 */
function Post({post}: {post: any}) {
  console.log('post', post)
  return (
    <Layout>
      <Breadcrumb post={post} />

      <div
        id={`post-${post.ID}`}
        className={`st-post post-${post.ID} post type-post status-publish format-standard has-post-thumbnail hentry`}
      >
        <article>
          <p className="st-catgroup">
            <Categories categories={post.post_category} />
          </p>
          <h2 className="entry-title">{post.post_title}</h2>
          <div className="blogbox">
            <PostDate post={post} />
          </div>
          <div className="mainbox">
            <div className="entry-content">
              <div id="content">
                <Eyecatch post={post} />
                <AdSense />
                <div dangerouslySetInnerHTML={{ __html: post.post_content}} />
              </div>
            </div>
            <AdSense />
          </div>
          <Sns />
          <p className="tagst">
            <FontAwesomeIcon icon={faFolderOpen} />&nbsp;
            <Categories categories={post.post_category} separate=", " /><br />
            <Tags tags={post.post_tags} />
          </p>
        </article>

        <div className="st-aside">
          <PrevNext posts={post.adjacent_post} />
          <Kanren posts={post.same_category_posts} />
        </div>
      </div>
    </Layout>
  )
}


/**
 * 静的生成するページリストをここで定義する
 */
export async function getStaticPaths () {
  const posts = await getAllPosts()
  const paths = posts.map((post) => {
    const {link} = getCategory(post.post_category)
    return {
      params: {
        category: link,
        slug: post.post_name
      }
    }
  })  
  return {
    paths: paths,
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