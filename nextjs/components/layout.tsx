import Header from 'components/header'
import Footer from 'components/footer'
import Sidebar from 'components/sidebar'


function Layout({ children }: { children: any }) {
  return (
    <>
			<div id="st-ami">
				<div id="wrapper">
				  <div id="wrapper-in">
            <Header />
            <div id="content-w">
              <div id="content" className="clearfix">
                <div id="contentInner">
		              <div className="st-main">
                    {children}
                  </div>
	              </div>
                <Sidebar />
              </div>
				    </div>
            <Footer />
    			</div>
		    </div>
	    </div>
	    <div id="page-top">
		    <a href="#wrapper" className="fa fa-angle-up"></a>
	    </div>
    </>
  )
}

export default Layout