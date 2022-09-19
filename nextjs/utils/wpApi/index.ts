import fetch from 'isomorphic-unfetch'
import jQuery from 'jquery'

/**
 * 記事一覧リストを取得
 */
export async function getPosts() {
  /*
  const params = jQuery.param({
    posts_per_page: 10,
  })
*/
  const params = 'posts_per_page=10'
  /*
    'has_password' => false,
    'thumbnail' => 'news_list',
    'posts_per_page' => 10,
    'orderby' => 'date',
    'order' => 'DESC',
    'category__in' => $categoryId,
    post_status' => array('publish', 'private')
*/

  const res = await fetch(`${process.env.WP_REST_API}/wp-json/wp/v2/query?${params}`)
  const json = await res.json()
  return {
    posts: json,
  }
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
