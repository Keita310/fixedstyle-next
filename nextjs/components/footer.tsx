const Footer = () => {
  return (
    <footer>
      <div id="footer">
        <div id="footer-in">
          <div className="left-contents">
            <p className="sitename">
              <a href="https://fixedstyle.net/">
                <img src="https://fixedstyle.net/wp-content/themes/fixedstyle/images/logo_light.png" alt="fixedstyleロゴ" title="fixedstyleロゴ" />
              </a>
            </p>
            <p className="discription">ピストバイク初心者 パーツやトリック、カスタムのことなら【Fixed Style】</p>
          </div>
          <div className="right-contents">
            <div className="footermenust">
              <ul>
                <li className="page_item page-item-41"><a href="https://fixedstyle.net/contact/">お問い合わせ</a></li>
                <li className="page_item page-item-325"><a href="https://fixedstyle.net/sitemap/">サイトマップ</a></li>
              </ul>
            </div>
            <p className="copy">&copy;ピストバイク初心者総合サイト【Fixed Style,2022 All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer