import { Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link'

// カスタムドキュメント(全体のカスタマイズ)
const MyDocument = () => {
  return (
    <Html lang='ja-JP'>
      <Head>
        <meta name='application-name' content='MyTemplate' />
        <meta name='description' content='' />

        <link rel='stylesheet' id='contact-form-7-css'  href='https://fixedstyle.net/wp-content/plugins/contact-form-7/includes/css/styles.css?ver=5.0.1' type='text/css' media='all' />
<link rel='stylesheet' id='toc-screen-css'  href='https://fixedstyle.net/wp-content/plugins/table-of-contents-plus/screen.min.css?ver=1509' type='text/css' media='all' />
<link rel='stylesheet' id='normalize-css'  href='https://fixedstyle.net/wp-content/themes/fixedstyle/css/normalize.css?ver=1.5.9' type='text/css' media='all' />
<link rel='stylesheet' id='font-awesome-css'  href='https://fixedstyle.net/wp-content/themes/fixedstyle/css/fontawesome/css/font-awesome.min.css?ver=4.5.0' type='text/css' media='all' />
<link rel='stylesheet' id='style-css'  href='https://fixedstyle.net/wp-content/themes/fixedstyle/style.css?ver=4.9.21' type='text/css' media='all' />
<link rel='stylesheet' id='yesno_style-css'  href='https://fixedstyle.net/wp-content/plugins/yesno/css/style.css?ver=1.0.6' type='text/css' media='all' />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument;