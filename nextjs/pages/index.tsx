import Link from 'next/link'
import {getAllPosts} from 'utils/wpApi'

import Layout from 'components/layout'
import Sns from 'components/sns'
import PostList from 'components/postList'
import Pager from 'components/pager'

function Index({posts}: {posts: any}) {
  return (
    <Layout>
      <div className="banner-recomends">
        <ul>
          <li>
            <Link href="https://fixedstyle.net/complete_bike/">
              <a>
                <img src="https://fixedstyle.net/wp-content/uploads/2018/03/complete_bike-500x250.jpg" />
                <span>ピストバイク完成車の選び方</span>
              </a>
            </Link>
          </li>
          <li>
            <a href="https://fixedstyle.net/other/gear/">
              <img src="https://fixedstyle.net/wp-content/uploads/2012/02/gear-500x250.jpg" />
              <span>ピストバイクギヤ比</span>
            </a>
          </li>
          <li>
            <a href="https://fixedstyle.net/beginner/about_pist/">
              <img src="https://fixedstyle.net/wp-content/uploads/2010/04/about_pist-500x250.jpg" />
              <span>ピストについて</span>
            </a>
          </li>
          <li>
            <a href="https://fixedstyle.net/customize/custom_brake/">
              <img src="https://fixedstyle.net/wp-content/uploads/2016/01/brake-500x250.jpg" />
              <span>ブレーキのカスタマイズ</span>
            </a>
          </li>
        </ul>
      </div>
      
      <article>
        <div className="st-aside">
          <PostList posts={posts} />
          <Pager />
        </div>
        <Sns />
      </article>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts()
  return {
    props: {
      posts: posts
    },
  }
}

export default Index