import {getPosts} from 'utils/wpApi'
import Layout from 'components/layout'
import PostList from 'components/molecules/postList'
import Pager from 'components/pager'

export function Category({
  posts,
  cat_name,
  page
}: {
  posts: any;
  cat_name: string;
  page: any
}) {
  return (
    <Layout>
      <article>
        <h2 className="entry-title">「{cat_name}」 一覧 </h2>
        <PostList posts={posts} />
        <Pager page={page} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths () {
  return {
    // 静的生成するページリストをここで定義する。APIで取得するように調整
    paths: [
      { params: { category: ['customize'] } },
      { params: { category: ['customize', 'page', '2'] } },
      { params: { category: ['customize', 'page', '3'] } },
      { params: { category: ['customize', 'page', '4'] } },
      { params: { category: ['customize', 'page', '5'] } },
      { params: { category: ['customize', 'page', '6'] } },
      { params: { category: ['customize', 'page', '7'] } },
      { params: { category: ['customize', 'page', '8'] } },
      { params: { category: ['customize', 'page', '9'] } },
      { params: { category: ['customize', 'page', '10'] } },
      { params: { category: ['customize', 'page', '11'] } },
      { params: { category: ['customize', 'page', '12'] } },
      { params: { category: ['customize', 'page', '13'] } },
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
      posts: posts,
      page: {
        current: Number(page),
        all: Number(max_num_pages)
      },
    },
  }
}

export default Category