import { getAllPosts } from 'utils/wpApi'

// https://zenn.dev/kote2/articles/eac7f15443265c#rest-api(restful-api)%E3%81%A8%E3%81%AF

const Container = () => {
  const list = getAllPosts()
  console.log(list)

  return <div>aasda</div>
}

/*
export async function getServerSideProps() {
  await getAllPosts();
}
*/
export default Container
