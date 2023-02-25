import type {NextApiRequest, NextApiResponse} from 'next'
import {GET_POSTS_TYPES} from 'const'
import {getPosts} from 'utils/wpApi'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = req.query?.page as string
  const keyword = req.query?.keyword as string
  const result = await getPosts(page, keyword, GET_POSTS_TYPES.KEYWORD)
  res.status(200).json(result)
}
