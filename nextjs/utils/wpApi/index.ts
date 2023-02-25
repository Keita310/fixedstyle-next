import {POSTS_PER_PAGE, GET_POSTS_TYPES, COMPLETE_BIKES_CATE_ID} from 'const'
import fetch from 'isomorphic-unfetch'
import param from 'jquery-param';

/**
 * 記事一覧リストを取得
 */
export async function getPosts(page = 1, keyword = null, type: string = '') {
  const config = {
    'posts_per_page': POSTS_PER_PAGE,
    'has_password': 0, // false
    'thumbnail': 'news_list',
    'orderby': 'date',
    'order': 'DESC',
    'category__not_in': COMPLETE_BIKES_CATE_ID, // 完成車は除く
    'paged': page,
    'post_status': ['publish']
  } as any

  if (type === GET_POSTS_TYPES.CATEGORY) {
    config.category_name = keyword
  }
  if (type === GET_POSTS_TYPES.TAG) {
    config.tag = keyword
  }

  const params = param(config)
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

/**
 * カテゴリ一覧を取得(親のみ)
 */
export async function getCategories() {
  const params = param({
    'parent': 0 
  })
  return await get(`categories?${params}`)
}

/**
 * タグ一覧を取得
 */
export async function getTags() {
  return await get(`tags`)
}

/**
 * タグ一覧を取得(完成車カテゴリを除く)
 */
export async function getTagsNotInCompleteBikes() {
  const params = param({
    'category__not_in': COMPLETE_BIKES_CATE_ID
  })
  return await get(`tags?${params}`)
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