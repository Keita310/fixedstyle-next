<?php
	$post = $wp_query->post;

	// 完成車のテンプレート
	if ( in_category('36') ) {
		include(TEMPLATEPATH.'/single-complete-bike.php');
	} else {
		include(TEMPLATEPATH.'/single-main.php');
	}
?>