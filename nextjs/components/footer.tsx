import Link from 'next/link'
import {URLS} from 'const'

const Footer = () => {
  return (
    <footer>
      <div id="footer">
        <div id="footer-in">
          <div className="left-contents">
            <p className="sitename">
              <Link href="/">
                <a>
                  <img src="https://fixedstyle.net/wp-content/themes/fixedstyle/images/logo_light.png" alt="fixedstyleロゴ" title="fixedstyleロゴ" />
                </a>
              </Link>
            </p>
            <p className="discription">ピストバイク初心者 パーツやトリック、カスタムのことなら【Fixed Style】</p>
          </div>
          <div className="right-contents">
            <div className="footermenust">
              <ul>
                <li className="page_item">
                  <Link href={URLS.SITE + '/contact'}>
                    <a>お問い合わせ</a>
                  </Link>
                </li>
                <li className="page_item">
                  <Link href={URLS.SITE + '/sitemap'}>
                    <a>サイトマップ</a>
                  </Link>
                </li>
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