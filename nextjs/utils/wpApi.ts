import fetch from 'isomorphic-unfetch'

/**
 * 記事一覧リストを取得
 */
export async function getAllPosts() {
  const res = await fetch(`${process.env.WP_REST_API}/wp-json/wp/v2/posts/`)
  const json = await res.json()
  console.log(json)
  return json
}

// こんな感じで同じように定義しておけばimport時読み込める
export async function getAllPoststttt() {
  return false
}
