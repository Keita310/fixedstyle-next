const Img = ({ post, size = 'st_thumb100' }: { post: any; size: string }) => {
  if (!post.post_eyecatch || !post.post_eyecatch.width_sort) {
    return <></>
  }

  const imgs = post.post_eyecatch.width_sort
  const length = imgs.length
  let main = []
  let srcSet = []
  let isContinue = true

  // widthが大きい順に並んでいる
  for (let i = 0; i < length; i++) {
    const img = imgs[i]
    const url = img[0]
    const w = img[1]
    const key = img[4]
    // 指定サイズ以下を使用する
    if (key === size) {
      isContinue = false
      main = img
    }
    if (isContinue) {
      continue
    }
    srcSet.push(`${url} ${w}w`)
  }

  return (
    <img
      className={`aaa attachment-${size} size-${size} wp-post-image`}
      alt={post.post_title}
      src={main[0]}
      srcSet={srcSet.join(', ')}
      sizes={`(max-width: ${main[1]}px) 100vw, ${main[1]}px`}
      width={main[1]}
      height={main[2]}
    />
  )
}

export default Img

/*
・旧投稿はeyecatchが指定されていない
<img class="alignnone size-full wp-image-682" src="https://fixedstyle.net/wp-content/uploads/2020/01/4.jpg" alt="" srcset="https://fixedstyle.net/wp-content/uploads/2020/01/4.jpg 700w, https://fixedstyle.net/wp-content/uploads/2020/01/4-300x180.jpg 300w" sizes="(max-width: 700px) 100vw, 700px" width="700" height="419">
<img class="attachment-full size-full wp-post-image" src="https://fixedstyle.net/wp-content/uploads/2020/01/13.jpg" alt="" srcset="https://fixedstyle.net/wp-content/uploads/2020/01/13.jpg 700w, https://fixedstyle.net/wp-content/uploads/2020/01/13-300x211.jpg 300w" sizes="(max-width: 700px) 100vw, 700px" width="700" height="492">
<img class="alignleft size-full wp-image-702" src="https://fixedstyle.net/wp-content/uploads/2020/01/16.jpg" alt="" srcset="https://fixedstyle.net/wp-content/uploads/2020/01/16.jpg 248w, https://fixedstyle.net/wp-content/uploads/2020/01/16-150x150.jpg 150w, https://fixedstyle.net/wp-content/uploads/2020/01/16-100x100.jpg 100w" sizes="(max-width: 248px) 100vw, 248px" width="248" height="248">
<img class="alignnone size-thumbnail wp-image-699" style="padding: 5px; border: 3px double #ccc;" src="https://fixedstyle.net/wp-content/uploads/2020/01/15-150x150.jpg" alt="" srcset="https://fixedstyle.net/wp-content/uploads/2020/01/15-150x150.jpg 150w, https://fixedstyle.net/wp-content/uploads/2020/01/15-100x100.jpg 100w" sizes="(max-width: 150px) 100vw, 150px" width="150" height="150">
<img class="attachment-thumbnail size-thumbnail wp-post-image" src="https://fixedstyle.net/wp-content/uploads/2016/01/brake-150x150.jpg" alt="ブレーキのカスタム" srcset="https://fixedstyle.net/wp-content/uploads/2016/01/brake-150x150.jpg 150w, https://fixedstyle.net/wp-content/uploads/2016/01/brake-100x100.jpg 100w" sizes="(max-width: 150px) 100vw, 150px" width="150" height="150">

記事上アイキャッチ(新)
<img src="https://fixedstyle.net/wp-content/uploads/2020/01/13.jpg" class="attachment-full size-full wp-post-image" alt="" srcset="https://fixedstyle.net/wp-content/uploads/2020/01/13.jpg 700w, https://fixedstyle.net/wp-content/uploads/2020/01/13-300x211.jpg 300w" sizes="(max-width: 700px) 100vw, 700px" width="700" height="492">
記事上アイキャッチ(旧)
<img src="https://fixedstyle.net/wp-content/static-img/parts/chain/chain.jpg" class="old-thumbnail">

一覧(新)
<img src="https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top-150x150.jpg" class="attachment-thumbnail size-thumbnail wp-post-image" alt="ピストシート交換" srcset="https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top-150x150.jpg 150w, https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top-100x100.jpg 100w" sizes="(max-width: 150px) 100vw, 150px" width="150" height="150">
<img src="https://fixedstyle.net/wp-content/uploads/2014/02/handle-150x150.jpg" class="attachment-thumbnail size-thumbnail wp-post-image" alt="ピストバイクハンドル" srcset="https://fixedstyle.net/wp-content/uploads/2014/02/handle-150x150.jpg 150w, https://fixedstyle.net/wp-content/uploads/2014/02/handle-300x300.jpg 300w, https://fixedstyle.net/wp-content/uploads/2014/02/handle-768x768.jpg 768w, https://fixedstyle.net/wp-content/uploads/2014/02/handle-100x100.jpg 100w, https://fixedstyle.net/wp-content/uploads/2014/02/handle.jpg 1000w" sizes="(max-width: 150px) 100vw, 150px" width="150" height="150">
一覧(旧)
<img src="https://fixedstyle.net/wp-content/static-img/parts/chain/chain.jpg" class="old-thumbnail">

次へ、前へ
新
<img src="https://fixedstyle.net/wp-content/uploads/2014/09/chain_mainte-100x100.jpg" class="attachment-st_thumb100 size-st_thumb100 wp-post-image" alt="チェーンメンテナンス" srcset="https://fixedstyle.net/wp-content/uploads/2014/09/chain_mainte-100x100.jpg 100w, https://fixedstyle.net/wp-content/uploads/2014/09/chain_mainte-150x150.jpg 150w" sizes="(max-width: 100px) 100vw, 100px" width="100" height="100">

関連新
<img src="https://fixedstyle.net/wp-content/uploads/2014/11/air-150x150.jpg" class="attachment-thumbnail size-thumbnail wp-post-image" alt="ピスト空気入れ" srcset="https://fixedstyle.net/wp-content/uploads/2014/11/air-150x150.jpg 150w, https://fixedstyle.net/wp-content/uploads/2014/11/air-100x100.jpg 100w" sizes="(max-width: 150px) 100vw, 150px" width="150" height="150">
*/
