const Kanren = ({posts}: {posts: any}) => {
  return (
    <>
      <p className="point"><span className="point-in">関連記事</span></p>
      <div className="kanren">
        <dl>
          <dt>
            <a href="https://fixedstyle.net/customize/throttle_brake/">
              <img width="150" height="150" src="https://fixedstyle.net/wp-content/uploads/2020/01/13-150x150.jpg" className="attachment-thumbnail size-thumbnail wp-post-image" alt="" srcSet="https://fixedstyle.net/wp-content/uploads/2020/01/13-150x150.jpg 150w, https://fixedstyle.net/wp-content/uploads/2020/01/13-100x100.jpg 100w" sizes="(max-width: 150px) 100vw, 150px" />
            </a>
          </dt>
          <dd>
            <p className="kanren-t">
              <a href="https://fixedstyle.net/customize/throttle_brake/">スロットルブレーキカスタム</a>
            </p>
            <div className="smanone2">
              <p>オートバイのアクセルのことを主に指します。 グリップをヒネることでワイヤーが引っ張られ、その動作でエンジンの回転数があがります。 (正確には燃料調整機能のことですがここではグリップ操作機構のこととしま &#8230; </p>
            </div>
          </dd>
        </dl>
      </div>
    </>
  )
}

export default Kanren