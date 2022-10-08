import Link from 'next/link'
import Layout from 'components/layout'


function Category() {
  return (
    <Layout>
      category
    </Layout>
  )
}

export async function getStaticPaths () {
  return {
    // 静的生成するページリストをここで定義する。APIで取得するように調整
    paths: [
      { params: { category: 'customize' } },
    ],
    fallback: false,
  }
}


export async function getStaticProps() {
  return {
    props: {
      posts: {}
    },
  }
}

export default Category