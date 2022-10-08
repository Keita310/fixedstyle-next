const Header = () => {
  return (
    <header>
      <div id="headbox-bg">
        <div className="clearfix" id="headbox">
          <div id="header-l">
            <p className="sitename">
              <a href="https://fixedstyle.net/">
                <img src="https://fixedstyle.net/wp-content/themes/fixedstyle/images/logo_dark.png" alt="fixedstyleロゴ" title="fixedstyleロゴ" />
              </a>
            </p>
            <h1 className="descr">ピストバイク初心者 パーツやトリック、カスタムのことなら【Fixed Style】</h1>	
          </div>

          {/* アコーディオンメニュー  */}
          <nav id="s-navi" className="pcnone">
            <div className="acordion">
              <div className="trigger">
                <p><span className="op"><i className="fa fa-bars"></i></span></p>
              </div>
              <div className="acordion_tree">
                <div className="menu-%e3%83%98%e3%83%83%e3%83%80%e3%83%bc-container">
                  <ul id="menu-%e3%83%98%e3%83%83%e3%83%80%e3%83%bc" className="menu"><li id="menu-item-370" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-370"><a href="https://fixedstyle.net/complete_bike/">ピストバイク完成車</a></li>
                    <li id="menu-item-262" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-262"><a href="https://fixedstyle.net/beginner/">ピストバイク入門</a></li>
                    <li id="menu-item-258" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-258"><a href="https://fixedstyle.net/parts/">パーツ</a></li>
                    <li id="menu-item-27" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-27"><a href="https://fixedstyle.net/customize/">カスタマイズ</a></li>
                    <li id="menu-item-28" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-28"><a href="https://fixedstyle.net/maintenance/">メンテナンス</a></li>
                    <li id="menu-item-261" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-261"><a href="https://fixedstyle.net/trick/">トリック</a></li>
                  </ul>
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
              <ul id="menu-%e3%83%98%e3%83%83%e3%83%80%e3%83%bc-1" className="menu">
                <li className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-370"><a href="https://fixedstyle.net/complete_bike/">ピストバイク完成車</a></li>
                <li className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-262"><a href="https://fixedstyle.net/beginner/">ピストバイク入門</a></li>
                <li className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-258"><a href="https://fixedstyle.net/parts/">パーツ</a></li>
                <li className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-27"><a href="https://fixedstyle.net/customize/">カスタマイズ</a></li>
                <li className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-28"><a href="https://fixedstyle.net/maintenance/">メンテナンス</a></li>
                <li className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-261"><a href="https://fixedstyle.net/trick/">トリック</a></li>
              </ul>
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