import fetch from 'isomorphic-unfetch'
import param from 'jquery-param';

/**
 * 記事一覧リストを取得
 */
export async function getPosts() {
  const params = param({
    'posts_per_page': 10,
    'has_password': 0, // false
    'thumbnail': 'news_list',
    'orderby': 'date',
    'order': 'DESC',
    'category__not_in': 36, // 完成車は除く
    'post_status': ['publish']
  })

  const res = await fetch(`${process.env.WP_REST_API}/wp-json/wp/v2/query?${params}`)
  return await res.json()
}

/**
 * 記事一覧リストを取得
 */
export async function getAllPosts() {
  const res = await fetch(`${process.env.WP_REST_API}/wp-json/wp/v2/posts/`)
  return await res.json()
}

// こんな感じで同じように定義しておけばimport時読み込める
export async function getAllPoststttt() {
  return false
}
