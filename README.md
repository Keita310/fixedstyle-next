# fixedstyle-next

### １、next.jsの初回実行
cloneした直後、docker-compose up する前に実行する必要あり。
docker-compose run --rm {nextjsのサービス名} npm install

### ２、環境変数指定
wordpress/wp-content/thmemes/fixedstyle/.end.php

### ３、初期データ用意
docker/db/seeder/{WPからexportしたsqlファイル}

### ４、画像ファイル用意
wordpress/wp-content/static-img/{FC2時代の静的ページ画像を用意}
wordpress/wp-content/uploads/{WPからUPした画像}

### ５、プラグイン手動インストール
acf-repeater.2.0.1.zip