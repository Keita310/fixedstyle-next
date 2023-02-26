import Link from 'next/link'
import {URLS} from 'const'

const Menu = () => {
  const configs = [
    {link: '/complete_bike', title: 'ピストバイク完成車'},
    {link: '/beginner', title: 'ピストバイク入門'},
    {link: '/parts', title: 'パーツ'},
    {link: '/customize', title: 'カスタマイズ'},
    {link: '/maintenance', title: 'メンテナンス'},
    {link: '/trick', title: 'トリック'}
  ]
  return (
    <ul className="menu">
      {configs.map((config, index) => (
        <li key={index} className="menu-item menu-item-type-taxonomy menu-item-object-category">
          <Link href={config.link}>
            <a>{config.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const Header = () => {
  return (
    <header>
      <div id="headbox-bg">
        <div className="clearfix" id="headbox">
          <div id="header-l">
            <p className="sitename">
              <Link href="/">
                <a>
                  <img src="https://fixedstyle.net/wp-content/themes/fixedstyle/images/logo_dark.png" alt="fixedstyleロゴ" title="fixedstyleロゴ" />
                </a>
              </Link>
            </p>
            <h1 className="descr">ピストバイク初心者 パーツやトリック、カスタムのことなら【Fixed Style】</h1>	
          </div>

          {/* アコーディオンメニュー  */}
          <nav id="s-navi" className="pcnone">
            <div className="acordion">
              <label htmlFor="acordion">
              <div className="trigger">
                <p>
                  <span className="op"><i className="fa fa-bars"></i></span>
                </p>
              </div>
              </label>
              <input id="acordion" type="checkbox" />
              <div className="acordion_tree">
                <div>
                  <Menu />
                </div>
                <div className="clear"></div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div id="gazou-wide">
        <div id="st-menubox">
          <div id="st-menuwide">
            <nav className="smanone clearfix">
              <Menu />
            </nav>
          </div>
		    </div>
        <div id="st-headerbox">
          <div id="st-header">
            <img src="https://fixedstyle.net/wp-content/uploads/2018/03/top.jpg" height="350" width="1060" alt="" />
            {/*<img src="https://fixedstyle.net/wp-content/uploads/2018/03/top-1.jpg" height="350" width="1060" alt="" />*/}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header