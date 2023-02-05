import fetch from 'isomorphic-unfetch'
import param from 'jquery-param';

/**
 * 記事一覧リストを取得
 */
export async function getPosts(page = 1, category = null) {
  const params = param({
    'posts_per_page': 10,
    'has_password': 0, // false
    'thumbnail': 'news_list',
    'orderby': 'date',
    'order': 'DESC',
    'category__not_in': 36, // 完成車は除く
    'category_name': category,
    'paged': page,
    'post_status': ['publish']
  })
  return await get(`query?${params}`)
}

/**
 * 記事一覧リストを取得
 */
export async function getAllPosts() {
  const params = param({
    'posts_per_page': -1,
    'has_password': 0, // false
    'post_status': ['publish'],
  })
  return await get(`query?${params}`)
}

// 記事取得
export async function getPost(slug: string) {
  return await get(`post/${slug}`)
}

// 共通get
async function get(endpoint: string) {
  const url = `${process.env.WP_REST_API}/wp-json/wp/v2/${endpoint}`
  const options = {
    method: 'GET'
  }
  try {
    const res = await fetch(url, options)
    return await res.json()
  } catch (e) {
    console.error(e)
    throw e
  }
}