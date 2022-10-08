const Sns = () => {
  // パラメータのURLが動的に入るようにする必要がある
  return (
    <div className="sns">
      <ul className="clearfix">
        <li className="twitter"> <a onClick="window.open('//twitter.com/intent/tweet?url=https%3A%2F%2Ffixedstyle.net&text=%E3%83%94%E3%82%B9%E3%83%88%E3%83%90%E3%82%A4%E3%82%AF%E5%88%9D%E5%BF%83%E8%80%85%E7%B7%8F%E5%90%88%E3%82%B5%E3%82%A4%E3%83%88%E3%80%90Fixed+Style%E3%80%91&tw_p=tweetbutton', '', 'width=500,height=450'); return false;"><i className="fa fa-twitter"></i><span className="snstext " >Twitter</span></a> </li>
        <li className="facebook"> <a target="_blank" href="//www.facebook.com/sharer.php?src=bm&u=https%3A%2F%2Ffixedstyle.net&t=%E3%83%94%E3%82%B9%E3%83%88%E3%83%90%E3%82%A4%E3%82%AF%E5%88%9D%E5%BF%83%E8%80%85%E7%B7%8F%E5%90%88%E3%82%B5%E3%82%A4%E3%83%88%E3%80%90Fixed+Style%E3%80%91" rel="noreferrer"><i className="fa fa-facebook"></i><span className="snstext " >Facebook</span></a> </li>
        <li className="googleplus"> <a target="_blank" href="https://plus.google.com/share?url=https%3A%2F%2Ffixedstyle.net" rel="noreferrer"><i className="fa fa-google-plus"></i><span className="snstext " >Google+</span></a> </li>
        <li className="pocket"> <a onClick="window.open('//getpocket.com/edit?url=https%3A%2F%2Ffixedstyle.net&title=%E3%83%94%E3%82%B9%E3%83%88%E3%83%90%E3%82%A4%E3%82%AF%E5%88%9D%E5%BF%83%E8%80%85%E7%B7%8F%E5%90%88%E3%82%B5%E3%82%A4%E3%83%88%E3%80%90Fixed+Style%E3%80%91', '', 'width=500,height=350'); return false;"><i className="fa fa-get-pocket"></i><span className="snstext " >Pocket</span></a></li>
        <li className="hatebu"> <a href="//b.hatena.ne.jp/entry/" className="hatena-bookmark-button" data-hatena-bookmark-layout="simple" title="ピストバイク初心者総合サイト【Fixed Style】"><span className="fa-hatena">B!</span><span className="snstext " >はてブ</span></a><script type="text/javascript" src="//b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script></li>
        <li className="line"> <a target="_blank" href="//line.me/R/msg/text/?%E3%83%94%E3%82%B9%E3%83%88%E3%83%90%E3%82%A4%E3%82%AF%E5%88%9D%E5%BF%83%E8%80%85%E7%B7%8F%E5%90%88%E3%82%B5%E3%82%A4%E3%83%88%E3%80%90Fixed+Style%E3%80%91%0Ahttps%3A%2F%2Ffixedstyle.net" rel="noreferrer"><i className="fa fa-comment" aria-hidden="true"></i><span className="snstext" >LINE</span></a> </li>
      </ul>
    </div>
  )
}

export default Sns