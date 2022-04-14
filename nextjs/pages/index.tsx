import { useCounter } from 'components/useCounter'
import Header from 'components/organisms/header'
import PostList from 'components/molecules/postList'
import { getPosts } from 'utils/wpApi'
import { PropsTypes } from 'types/pages/index'

export default function App({ posts }: PropsTypes) {
  const { count, increment, decrement } = useCounter(10)

  const incrementDouble = () => {
    increment()
    increment()
  }

  const decrementDouble = () => {
    decrement()
    decrement()
  }

  return (
    <div className='App'>
      <Header description='ピストバイク初心者 パーツやトリック、カスタムのことなら【Fixed Style】' />
      <h1>Count: {count}</h1>
      <button onClick={incrementDouble}>2 増やす</button>
      <button onClick={decrementDouble}>2 減らす</button>

      <article>
        <PostList posts={posts} />
      </article>
    </div>
  )
}

export async function getStaticProps() {
  const posts = await getPosts()
  return {
    props: posts,
  }
}
