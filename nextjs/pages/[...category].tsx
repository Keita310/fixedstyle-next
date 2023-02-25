import {POSTS_PER_PAGE, GET_POSTS_TYPES} from 'const'
import {getPosts, getCategories, getTags} from 'utils/wpApi'
import Layout from 'components/layout'
import PostList from 'components/molecules/postList'
import Pager from 'components/pager'

export function Category({
  posts,
  title,
  page
}: {
  posts: any;
  title: string;
  page: any
}) {
  return (
    <Layout>
      {console.log(page)}
      <article>
        <h2 className="entry-title">「{title}」 一覧 </h2>
        <PostList posts={posts} />
        <Pager page={page} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths () {
  const paths = []

  // カテゴリページ
  const categories = await getCategories()
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

  // タグページ
  const tags = await getTags()
  for (const tag of tags) {
    const pageCount = Math.ceil(Number(tag.count) / POSTS_PER_PAGE)
    for (let i = 1; i <= pageCount; i++) {
      const path = (i === 1) ? ['tag', tag.name] : ['tag', tag.name, 'page', String(i)]
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

export async function getStaticProps({params}: {params: any}) {
  const paths = params.category;
  const slug = paths[0]
  const page = paths.indexOf('page') !== -1 ? paths[paths.indexOf('page') + 1] : 1

  // タグページ
  if (slug === 'tag') {
    const tag = paths[1]
    const {posts, max_num_pages} = await getPosts(page, tag, GET_POSTS_TYPES.TAG)
    return {
      props: {
        title: tag,
        posts: posts,
        page: {
          current: Number(page),
          all: Number(max_num_pages)
        },
      }
    }
  }

  // カテゴリページ
  const {posts, max_num_pages} = await getPosts(page, slug, GET_POSTS_TYPES.CATEGORY)
  return {
    props: {
      title: posts[0].post_category[0].cat_name,
      posts: posts,
      page: {
        current: Number(page),
        all: Number(max_num_pages)
      },
    }
  }

}

export default Category