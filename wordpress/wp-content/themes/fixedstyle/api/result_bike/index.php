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

if (!isset($_GET['bike'])) {
	return;
}


require_once './../../../../../wp-load.php';
global $wpdb;

$slug = $_GET['bike'];
$slug = str_replace('_', '-', $slug);
$slug = str_replace('answer:', '', $slug);

$args = array(
	'name' => $slug
);
ob_start();
$st_query = new WP_Query($args);
if ($st_query->have_posts()) {
	while ($st_query->have_posts()) {
		$st_query->the_post();

	//		echo '<a href="' . the_permalink() . '">';

		echo '<h4>' . get_the_tags()[0]->name . ' / ' . str_replace('非公開: ', '', get_the_title()) . '</h4>';
		echo '<div class="big-eyecatch">';
			get_the_eyecatch(null, 'full');
		echo '</div>';
		echo the_content();
		get_template_part( 'elements/affi_link' );
	}
} else {
	echo '<p>診断結果のピストバイクが取得できませんでした。</p>';
}
echo '<button id="return_first">最初に戻る</button>';

wp_reset_postdata();

$html = ob_get_clean();

$json = json_encode(array('html' => $html));
echo $json;
exit;
?>
