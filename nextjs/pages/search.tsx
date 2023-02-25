import {useState, useEffect} from 'react';
import {useRouter} from 'next/router'
import Layout from 'components/layout'
import PostList from 'components/molecules/postList'
import Pager from 'components/pager'
import fetch from 'isomorphic-unfetch'

export function Search() {
  const router = useRouter()
  const w = router.query.w as string
  const p = router.query.p as string

  const [foundPosts, setFoundPosts] = useState(0)
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState({current: '1', all: '1'})

  useEffect(() => {
    (async() => {
      const params = new URLSearchParams({
        'keyword': w,
        'page': p
      })
      const res = await fetch(`api/search?${params}`)
      const {posts, max_num_pages, found_posts} = await res.json()
      setFoundPosts(found_posts)
      setPosts(posts)
      setPage({current: p, all: max_num_pages})
    })()
  }, [w, p])


  return (
    <Layout>
      <article>
        <h2 className="entry-title">「{w}」の検索結果 {foundPosts} 件</h2>
        <PostList posts={posts} />
        <Pager page={page} />
      </article>
    </Layout>
  )
}

/*
export async function getServerSideProps(context) {

}
*/

export async function getStaticProps({params}: {params: any}) {
  return {
    props: {

    }
  }
}

export default Search