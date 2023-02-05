import {getPosts} from 'utils/wpApi'
import Layout from 'components/layout'
import PostList from 'components/molecules/postList'
import Pager from 'components/pager'

export function Category({posts, cat_name}: {posts: any; cat_name: string}) {
  return (
    <Layout>
      <article>
        <h2 className="entry-title">「{cat_name}」 一覧 </h2>
        <PostList posts={posts} />
        <Pager />
      </article>
    </Layout>
  )
}

export async function getStaticPaths () {
  return {
    // 静的生成するページリストをここで定義する。APIで取得するように調整
    paths: [
      { params: { category: ['customize', 'page', '2'] } },
      { params: { category: ['customize'] } },
    ],
    fallback: false,
  }
}

export async function getStaticProps({params}) {
  const cateName = params.category[0];
  const page = (params.category[2] !== undefined) ? params.category[2] : 1;
  const {posts, max_num_pages} = await getPosts(page, cateName)
  return {
    props: {
      cat_name: posts[0].post_category[0].cat_name,
      posts: posts
    },
  }
}

export default Category