FROM wordpress:4.9.2-php7.0-apache

# 必要なツール郡をインストール
RUN apt-get update
RUN apt-get -y install wget unzip

# WP プラグイン (zip) ダウンロード
WORKDIR /tmp/wp-plugins
RUN wget https://downloads.wordpress.org/plugin/amp.1.0.1.zip
RUN wget https://downloads.wordpress.org/plugin/advanced-custom-fields.4.4.12.zip
RUN wget https://downloads.wordpress.org/plugin/akismet.4.0.8.zip
RUN wget https://downloads.wordpress.org/plugin/all-in-one-seo-pack.2.4.5.1.zip
RUN wget https://downloads.wordpress.org/plugin/contact-form-7.5.0.1.zip
RUN wget https://downloads.wordpress.org/plugin/google-sitemap-generator.4.0.9.zip
RUN wget https://downloads.wordpress.org/plugin/no-category-base-wpml.zip
RUN wget https://downloads.wordpress.org/plugin/regenerate-thumbnails.3.0.2.zip
RUN wget https://downloads.wordpress.org/plugin/revision-control.2.3.2.zip
RUN wget https://downloads.wordpress.org/plugin/rvg-optimize-database.4.6.2.zip
RUN wget https://downloads.wordpress.org/plugin/simple-ga-ranking.2.0.9.zip
RUN wget https://downloads.wordpress.org/plugin/table-of-contents-plus.1601.zip
RUN wget https://downloads.wordpress.org/plugin/taxonomy-terms-order.1.5.3.2.zip
RUN wget https://downloads.wordpress.org/plugin/wp-multibyte-patch.2.8.1.zip
RUN wget https://downloads.wordpress.org/plugin/wp-sitemap-page.zip
RUN wget https://downloads.wordpress.org/plugin/yesno.1.0.6.zip
# acf-repeater.2.0.1.zipは手動でインストールが必要・・

# Zip ファイルを解凍してインストール
RUN unzip -q -o './*.zip' -d /usr/src/wordpress/wp-content/plugins

# 不要になった一時ファイルを削除
RUN apt-get clean
RUN rm -rf /tmp/*

# サーバが読めるように wp-content 以下の所有者を変更
RUN chown -R www-data:www-data /usr/src/wordpress/wp-content

WORKDIR /var/www/html