import {URLS} from 'const'

/**
 * カテゴリデータを取得
 * (子カテゴリは無視する)
 */
export const getCategory = (categories: any, isFullPath: boolean = false) => {
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].parent > 0) {
      continue;
    }
    return {
      link: (isFullPath ? `${URLS.SITE}/` : '') + categories[i].slug,
      name: categories[i].name
    }
  }
}