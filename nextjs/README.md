This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


```
fixedstyle


wordpress
next.js
type script
ssg ssrで頑張る？light sail
litesail

dockerに開発環境整える。



next.jsの構成サンプル
https://github.com/kote2kote/basicnext_kote2
https://github.com/Shelob9/next-wordpress-docker
https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress

WordPress / Vue(Nuxt.js) / React(Next.js)の3つの方法でWebサイト構築してみたメモ
https://zenn.dev/kote2/articles/eac7f15443265c


docker
https://amateur-engineer-blog.com/nextjs-docker-compose/
https://penpen-dev.com/blog/wordpress-docker-headless/



wordpressをAPI化
https://fixedstyle.net/wp-json/wp/v2/posts/



SSG
https://qiita.com/zaburo/items/ad931e266fff35e1d756

getStaticProps と getStaticPaths と getServerSideProp
https://qiita.com/matamatanot/items/1735984f40540b8bdf91
https://y-hiroyuki.xyz/next-js/getstaticpaths


ディレクトリ構成の決め方
https://maku.blog/p/4is2ahp/


TSの設定
https://qiita.com/dtakkiy/items/a19d81604d534ec605a2



ローカルアクセス先
http://localhost:3000/







------





アプリインストール
npx create-next-app fixedstyle-next --use-npm --typescript

package.json -> scripts -> build


ESLint導入
Prettier導入



// 削除する場合
npm uninstall パッケージ --save
npm uninstall パッケージ --save-dev



追加ライブラリ
npm install isomorphic-unfetch

// styled-components
// 本体
npm install --save styled-components
// ssr対応化
npm install --save-dev babel-plugin-styled-components
// TS環境対応化
npm install --save-dev @types/styled-components
https://zenn.dev/syu/articles/1070055effa6e2

// importを絶対パスで指定できるようにする
npm install --save-dev babel-plugin-root-import

// test周り
npm install --save-dev jest
npm install --save-dev @testing-library/react
npm install --save-dev enzyme
// 非公式ライブラリ
npm install --save-dev @wojtekmaj/enzyme-adapter-react-17

npm install --save-dev react-test-renderer @types/react-test-renderer
npm install --save-dev ts-jest







環境立ち上げ
npm run dev
本番データ構築
npm run build
本番サーバー立ち上げ
npm run start


lintチェック
npm run lint
コード整形
npm run format
```