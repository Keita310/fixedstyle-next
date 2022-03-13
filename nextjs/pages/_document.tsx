import { Html, Head, Main, NextScript } from 'next/document';

// カスタムドキュメント(全体のカスタマイズ)
const MyDocument = () => {
    return (
        <Html lang='ja-JP'>
            <Head>
                <meta name='application-name' content='MyyTemplate' />
                <meta name='description' content='' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default MyDocument;