import Link from 'next/link'
import Layout from 'components/layout'
import Breadcrumb from 'components/breadcrumb'
import AdSense from 'components/adSense'
import PrevNext from 'components/prevNext'
import Kanren from 'components/kanren'
import Sns from 'components/sns'
import {getPost} from 'utils/wpApi'

function Post({post}: {post: any}) {
  console.log(post)

  return (
    <Layout>
      <Breadcrumb />

      <div id="post-896" className="st-post post-896 post type-post status-publish format-standard has-post-thumbnail hentry category-customize">
        <article>
          <p className="st-catgroup">
            <a href="https://fixedstyle.net/customize/" title="View all posts in カスタマイズ" rel="category tag">
              <span className="catname st-catid4">カスタマイズ</span>
            </a>
          </p>
          <h2 className="entry-title">サドル(シート)の交換</h2>
          <div className="blogbox">
            <p>
              <span className="kdate">
                投稿日：<time className="updated" dateTime="2022-01-03T17:07:20+0900">2022年1月3日</time>
              </span>
            </p>
          </div>
          <div className="mainbox">
            <div className="entry-content">
              <div id="content">
                <div className="eyecatch">
                  <img width="800" height="613" src="https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top.jpg" className="attachment-full size-full wp-post-image" alt="ピストシート交換" srcSet="https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top.jpg 800w, https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top-300x230.jpg 300w, https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top-768x588.jpg 768w" sizes="(max-width: 800px) 100vw, 800px" />
                </div>
                <AdSense />
                <div dangerouslySetInnerHTML={{ __html: post.post_content, }} />
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
      { params: { category: 'customize', slug: 'aaaaa' } },
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