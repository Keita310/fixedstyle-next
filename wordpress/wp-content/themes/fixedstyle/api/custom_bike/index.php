<?php
session_start();
// 定数取得
include('./../../env.php');
// ヘッダー指定
header('Access-Control-Allow-Origin: ' . getenv('SITE_URL'));
header("Content-Type: application/json; charset=utf-8");
// csrf対策
if ($_SERVER['HTTP_X_CSRF_TOKEN'] !== $_SESSION['_csrf_token']) {
	header('HTTP/1.1 400 Bad Request');
	exit;
}
if ($_SERVER['HTTP_X_REQUESTED_WITH'] !== 'XMLHttpRequest') {
	header('HTTP/1.1 400 Bad Request');
	exit;
}

// URL構築
$params = http_build_query(array(
	'applicationId' => getenv('RAKUTEN_APP_ID_JS'),
	'affiliateId' => getenv('RAKUTEN_AFFI_ID'),
	'shopCode' => 'dinertokyo',
	'keyword' => 'カスタム完成車',
	'imageFlag' => 1,
	'availability' => 1,
	'hits' => 11
));
$url = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20140222?' . $params;
// 取得
$data = @file_get_contents($url);
echo $data;
exit;
?>
