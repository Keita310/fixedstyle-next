import Presenter from './presenter'
import { TagsTypes } from 'types/components/atoms/tags'

const Container = ({ tags }: TagsTypes) => {
  // タグ未指定の時は抜ける
  if (!tags) {
    return ''
  }
  return <Presenter tags={tags} />
}

export default Container
