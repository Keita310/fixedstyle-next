const Img = ({post}: {post: any}) => {
  if (!post.post_eyecatch) {
    return (<></>)
  }
  return (
/*
・旧投稿はeyecatchが指定されていない



            <img
              src={post.post_eyecatch.st_thumb150[0]}
              className='attachment-thumbnail size-thumbnail wp-post-image'
              alt={post.post_title}
              srcSet={
                post.post_eyecatch.st_thumb150[0] +
                ' ' +
                post.post_eyecatch.st_thumb150[1] +
                'w, ' +
                post.post_eyecatch.st_thumb100[0] +
                ' ' +
                post.post_eyecatch.st_thumb100[1] +
                'w'
              }
              sizes={
                '(max-width: ' +
                post.post_eyecatch.st_thumb150[1] +
                'px) 100vw, ' +
                post.post_eyecatch.st_thumb150[1] +
                'px'
              }
              width={post.post_eyecatch.st_thumb150[1]}
              height={post.post_eyecatch.st_thumb150[1]}
            />
*/


    <img
    width={post.post_eyecatch.st_thumb150[1]}
    height={post.post_eyecatch.st_thumb150[2]} 
    src={post.post_eyecatch.st_thumb150[0]}
    className="attachment-thumbnail size-thumbnail wp-post-image"
    alt={post.post_title}
    srcSet={`${post.post_eyecatch.st_thumb150[0]} ${post.post_eyecatch.st_thumb150[1]}w,
    ${post.post_eyecatch.st_thumb100[0]} ${post.post_eyecatch.st_thumb100[1]}w`}
    sizes={`(max-width: ${post.post_eyecatch.st_thumb150[1]}px) 100vw, ${post.post_eyecatch.st_thumb150[1]}px`}
  />
  )
}

export default Img