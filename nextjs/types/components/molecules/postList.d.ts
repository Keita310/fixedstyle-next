// 記事リストの配列
export type ListsTypes = {
  posts: array
}

// 配列の各項目
export type ListTypes = {
  post_title: string
  post_excerpt: string
  post_tags: array | boolean
  post_category: array
  post_permalink: string
  post_created_at: string
  post_updated_at: string
  post_eyecatch: array
}
