import {POSTS_PER_PAGE} from 'const'
import {getPosts, getCategories} from 'utils/wpApi'
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
  const categories = await getCategories()
  const paths = []
  for (const category of categories) {
    const pageCount = Math.ceil(Number(category.category_count) / POSTS_PER_PAGE)
    for (let i = 1; i <= pageCount; i++) {
      const path = (i === 1) ? [category.slug] : [category.slug, 'page', String(i)]
      paths.push({
        params: {
          category: path,
        }
      })
    }
  }
  return {
    paths: paths,
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