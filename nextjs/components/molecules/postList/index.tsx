import Presenter from './presenter'
import { ListsTypes } from 'types/components/molecules/postList'

const Container = ({ posts }: ListsTypes) => {
  return <Presenter posts={posts} />
}

export default Container
