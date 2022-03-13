<?php
//error_reporting(E_ALL ^ E_NOTICE);
error_reporting(-1);

// SDKをインポート
use Amazon\ProductAdvertisingAPI\v1\ApiException;
use Amazon\ProductAdvertisingAPI\v1\Configuration;
use Amazon\ProductAdvertisingAPI\v1\com\amazon\paapi5\v1\api\DefaultApi;
use Amazon\ProductAdvertisingAPI\v1\com\amazon\paapi5\v1\PartnerType;
use Amazon\ProductAdvertisingAPI\v1\com\amazon\paapi5\v1\ProductAdvertisingAPIClientException;
use Amazon\ProductAdvertisingAPI\v1\com\amazon\paapi5\v1\SearchItemsRequest;
use Amazon\ProductAdvertisingAPI\v1\com\amazon\paapi5\v1\SearchItemsResource;

// 定数を定義
include('./../env.php');
define('STATUS_STOCK', 'stock');
define('STATUS_EMPTY', 'empty');
define('STATUS_HIDDEN', 'hidden');
define('RAKUTEN_APP_ID', getenv('RAKUTEN_APP_ID'));
define('RAKUTEN_AFFI_ID', getenv('RAKUTEN_AFFI_ID'));
define('RAKUTEN_API_URL', 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?');
define('YAHOO_APP_ID', getenv('YAHOO_APP_ID'));
define('YAHOO_AFFI_ID', getenv('YAHOO_AFFI_ID'));
define('YAHOO_API_URL', 'https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?');
define('AMAZON_APP_ID', getenv('AMAZON_APP_ID'));
define('AMAZON_SECRET_ID', getenv('AMAZON_SECRET_ID'));
define('AMAZON_AFF_ID', getenv('AMAZON_AFF_ID'));

// インスタンス化
new update_affi();

class update_affi {

	function __construct() {
		// リクエスト制限
		if ($_SERVER['USER'] !== getenv('CRON_USER') && $_GET['USER'] !== getenv('CRON_USER')) {
			header('HTTP/1.1 400 Bad Request');
			echo json_encode(array('status' => 'NG', 'code' => 400));
			exit;
		}
		require_once './../../../../wp-load.php';
		$this->update();
	}

	function update() {
		global $wpdb;
		$log = array();
		// アフィリ自動更新リストの検索ワードを全て抽出
		// `wp_postmeta`.`meta_key`, `wp_postmeta`.`meta_value`
		$single_update = '';
		if (isset($_GET['id'])) {
			$post_id = preg_replace('/[^0-9]/', '', $_GET['id']);
			$single_update = " AND `$wpdb->posts`.`ID` = '{$post_id}'";
		}
		$affiWords = $wpdb->get_results("SELECT * FROM `$wpdb->postmeta` INNER JOIN `$wpdb->posts` ON `$wpdb->postmeta`.`post_id` = `$wpdb->posts`.`ID` WHERE `$wpdb->postmeta`.`meta_key` LIKE 'affiliate___search_word' AND `$wpdb->posts`.`post_type` LIKE 'post'{$single_update} ORDER BY `$wpdb->postmeta`.`post_id` ASC");

		if (!empty($affiWords)) {
			foreach ($affiWords as $affiWord) {
				$id = $affiWord->post_id;
				$keyword = $affiWord->meta_value;
				$data_key = str_replace('_search_word', '_data', $affiWord->meta_key);
				$display_key = str_replace('_search_word', '_display', $affiWord->meta_key);
				$display = $wpdb->get_var("SELECT `wp_postmeta`.`meta_value` FROM `$wpdb->postmeta` WHERE `meta_key` LIKE '{$display_key}' AND `post_id` = $id");
				// 非表示の場合は更新しない
				if ($display) {
					$data = array();

					usleep(2000000);

					$result = $this->getRakutenData($keyword);
					$log["【楽天】{$keyword}"] = $result;
					if ($result['status'] === 'ok') {
						$data['rakuten'] = $result['data'];
					}

					$result = $this->getYahooData($keyword);
					$log["【ヤフー】{$keyword}"] = $result;
					if ($result['status'] === 'ok') {
						$data['yahoo'] = $result['data'];
					}

					$result = $this->getAmazonData($keyword);
					$log["【Amazon】{$keyword}"] = $result;
					if ($result['status'] === 'ok') {
						$data['amazon'] = $result['data'];
					}

					$json = base64_encode(json_encode($data));
					$update_sql = "UPDATE `$wpdb->postmeta` set `meta_value` = '{$json}' WHERE `meta_key` = '{$data_key}' AND `post_id` = $id";
					$wpdb->get_results($update_sql);
				}
			}
		}
		// 完了
		if (isset($_GET['id'])) {
			echo json_encode($log);
		} else {
			echo "<html lang=\"ja\"><head><meta charset=\"UTF-8\"></head><body>";
			print_r($log);
			echo "</body></html>";
		}
		exit;
	}

	/*
	 * 楽天の商品データ取得
	 *
	 */
	private function getRakutenData($keyword, $availability = 1) {
		$data = array();
		$requestUrl = RAKUTEN_API_URL . http_build_query(array(
			'applicationId' => RAKUTEN_APP_ID,
			'affiliateId' => RAKUTEN_AFFI_ID,
			'formatVersion' => 2,
			'field' => 0,
			'availability' => $availability,
			'keyword' => $keyword
		));
		$result = json_decode(@file_get_contents($requestUrl), true);
		if (isset($result['error'])) {
			// 通信は成功、リクエスト失敗
			$data = array(
				'status'  => 'error',
				'message' => $result['error_description']
			);
		} else if (empty($result)) {
			$data = array(
				'status'  => 'error',
				'message' => 'リクエストエラー'
			);
		} else if ((int)$result['count'] > 0) {
			$status = ($availability === 1 ? STATUS_STOCK : STATUS_EMPTY);
			$item = $result['Items'][0];
			$data = array(
				'status'        => 'ok',
				'item_status'   => $status,
				'data'          => array(
					'mall'      => '楽天市場',
					'mall_key'  => 'rakuten',
					'url'       => $item['affiliateUrl'],
					'img'       => $item['mediumImageUrls'][0],
					'title'     => $item['itemName'],
					'price'     => $item['itemPrice'],
					'status'    => $status,
					'update'    => date('Y/m/d')
				)
			);
		} else if ($availability === 1) {
			// 在庫なしリクエスト
			$data = $this->getRakutenData($keyword, 0);
		} else {
			$data = array(
				'status'      => 'ok',
				'item_status' => STATUS_HIDDEN,
				'data'        => array()
			);
		}
		return $data;
	}

	/*
	 * ヤフーの商品データ取得
	 *
	 */
	private function getYahooData($keyword, $availability = 1) {
		$data = array();
		$requestUrl = YAHOO_API_URL . http_build_query(array(
			'appid' => YAHOO_APP_ID,
			'affiliate_type' => 'vc',
			'affiliate_id' => urlencode(YAHOO_AFFI_ID),
			'image_size' => 76,
			'in_stock' => ($availability === 1) ? true : false,
			'query' => $keyword
		));
		$result = json_decode(@file_get_contents($requestUrl), true);
		if (isset($result['Error']['Message'])) {
			// 通信は成功、リクエスト失敗
			$data = array(
				'status'  => 'error',
				'message' => $result['Error']['Message']
			);
		} else if (empty($result)) {
			$data = array(
				'status'  => 'error',
				'message' => 'リクエストエラー'
			);
		} else if ((int)$result['totalResultsAvailable'] > 0) {
			$status = ($availability === 1 ? STATUS_STOCK : STATUS_EMPTY);
			$item = $result['hits'][0];
			$data = array(
				'status'         => 'ok',
				'item_status'    => $status,
				'data'           => array(
					'mall'       => 'Yahoo!ショッピング',
					'mall_key'   => 'yahoo',
					'url'        => $item['url'],
					'img'        => $item['image']['small'],
					'title'      => $item['name'],
					'price'      => $item['priceLabel']['defaultPrice'],
					'status'     => $status,
					'update'     => date('Y/m/d')
				)
			);
		} else if ($availability === 1) {
			// 在庫なしリクエスト
			$data = $this->getYahooData($keyword, 0);
		} else {
			$data = array(
				'status'      => 'ok',
				'item_status' => STATUS_HIDDEN,
				'data'        => array()
			);
		}
		return $data;
	}

	/*
	 * AMAZONの商品データ取得
	 * amazonは基本在庫ありで検索される体にする。在庫なし非表示はなし
	 *
	 */
	private function getAmazonData($keyword) {
		// amazonのSDKautoload.phpを読み込み
		require_once(ABSPATH . 'vendor/paapi5-php-sdk/vendor/autoload.php');

		// リクエスト引数用インスタンスを用意
		$request = self::getAmazonRequestInstance($keyword);
		$invalids = $request->listInvalidProperties();
		if (count($invalids) > 0) {
			return array(
				'status'  => 'error',
				'message' => 'リクエストパラメータエラー:' . implode('|', $invalids)
			);
		}
		// PA-APIインスタンスを取得
		$apiInstance = self::getAmazonApiInstance();

		try {
			// リクエスト
			$response = $apiInstance->searchItems($request);
		} catch (ApiException $exception) {
			return array(
				'status'  => 'error',
				'message' => 'code: ' . $exception->getCode() . ' ' . $exception->getMessage()
			);
		} catch (Exception $exception) {
			return array(
				'status'  => 'error',
				'message' => 'Exception: ' . $exception->getMessage()
			);
		}

		// 商品データだけ取得
		$item = null;
		if ($response->getSearchResult() !== null) {
			$items = $response->getSearchResult()->getItems();
			$item = self::getAmazonItemMatch($items, $keyword);
		} else if ($response->getErrors() !== null) {
			return array(
				'status'  => 'error',
				'message' => 'code: ' . $response->getErrors()[0]->getCode() . ' ' . $response->getErrors()[0]->getMessage()
			);
		}
		if (!$item) {
			return array(
				'status'      => 'ok',
				'item_status' => STATUS_HIDDEN,
				'data'        => array()
			);
		}

		return array(
			'status'         => 'ok',
			'item_status'    => STATUS_STOCK,
			'data'           => array(
				'mall'       => 'Amazon',
				'mall_key'   => 'amazon',
				'url'        => $item->getDetailPageURL(),
				'img'        => self::getAmazonItemImage($item),
				'title'      => self::getAmazonItemTitle($item),
				'price'      => self::getAmazonItemPrice($item),
				'status'     => STATUS_STOCK,
				'update'     => date('Y/m/d')
			)
		);
	}

	/*
	 * AMAZONのPA-APIインスタンスを取得
	 */
	private static function getAmazonApiInstance() {
		// 初期設定
		$config = new Configuration();
		$config->setAccessKey(AMAZON_APP_ID);
		$config->setSecretKey(AMAZON_SECRET_ID);
		// hostがco.jpのリージョンはus-west-2
		$config->setHost('webservices.amazon.co.jp');
		$config->setRegion('us-west-2');

		// PA-APIインスタンス化
		return new DefaultApi(
			new \GuzzleHttp\Client(),
			$config
		);
	}

	/*
	 * AMAZONのリクエスト引数用インスタンス取得
	 */
	private static function getAmazonRequestInstance($keyword) {
		$request = new SearchItemsRequest();
		return $request
			// PartnerTag(アフィリID)
			->setPartnerType(PartnerType::ASSOCIATES)
			->setPartnerTag(AMAZON_AFF_ID)
			// レスポンスに含ませたい値のタイプ
			->setResources([
				SearchItemsResource::ITEM_INFOTITLE,
				SearchItemsResource::OFFERSLISTINGSPRICE,
				SearchItemsResource::IMAGESPRIMARYMEDIUM,
			])
			// 検索カテゴリー (All, AmazonVideo, Books, Hobbies, Music 等)
			->setSearchIndex('All')
			// 検索結果の数
			->setItemCount(30)
			// キーワード指定
			->setKeywords($keyword);
	}

	/*
	 * AMAZONの検索結果の商品名が一致しているものを返す
	 */
	private static function getAmazonItemMatch($items, $keyword) {
		$keywords = explode(' ', $keyword);
		foreach ($items as $item) {
			$title = self::getAmazonItemTitle($item);
			foreach ($keywords as $keyword) {
				if (stripos($title, $keyword) === false) {
					continue 2;
				}
			}
			return $item;
		}
		return null;
	}

	/*
	 * AMAZONの商品名を取得
	 */
	private static function getAmazonItemTitle($item) {
		if ($item->getItemInfo()
			&& $item->getItemInfo()->getTitle()
			&& $item->getItemInfo()->getTitle()->getDisplayValue()
		) {
			return $item->getItemInfo()->getTitle()->getDisplayValue();
		}
		return null;
	}

	/*
	 * AMAZONの商品価格を取得
	 */
	private static function getAmazonItemPrice($item) {
		if ($item->getOffers()
			&& $item->getOffers()
			&& $item->getOffers()->getListings()
			&& $item->getOffers()->getListings()[0]->getPrice()
			&& $item->getOffers()->getListings()[0]->getPrice()->getDisplayAmount()
		) {
			$price = $item->getOffers()->getListings()[0]->getPrice()->getDisplayAmount();
			return preg_replace('/[^0-9]/', '', $price);
		}
		return null;
	}

	/*
	 * AMAZONの商品画像を取得
	 */
	private static function getAmazonItemImage($item) {
		if ($item->getImages()
			&& $item->getImages()->getPrimary()
			&& $item->getImages()->getPrimary()->getMedium()
		) {
			return $item->getImages()->getPrimary()->getMedium()->getURL();
		}
		return null;
	}
}

?>