import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

type Props = {
  stars: number
  time: number
}

function Index({ stars, time }: Props) {
  const aaa = Date.now()
  return (
    <div>
      {aaa}
      {time}
      <p>Next.js has {stars} ⭐️</p>
      <Link href='/get-server-side-props'>
        <a>Go to getServerSideProps</a>
      </Link>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return {
    props: {
      stars: json.stargazers_count,
      time: Date.now(),
    },
  }
}

export default Index
