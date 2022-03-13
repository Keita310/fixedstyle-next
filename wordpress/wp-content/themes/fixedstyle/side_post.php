<?php
/**
 * サイドバー記事ブロックテンプレート
 */
?>
<aside >
	<h2 class="widget-title">
		<?php if (isset($config['font-awesome'])): ?><i class="fa fa-<?php echo $config['font-awesome']; ?>"></i><?php endif; ?><?php echo $config['list_title']; ?>
	</h2>
	<div class="kanren <?php echo $config['label']; ?>">
		<?php
		//記事データ取得
		$my_posts = get_posts( $config );
		//記事ID指定があれば指定順にソート
		$my_posts = post_id_sort($my_posts, $config);
		//記事ループ
		foreach ( $my_posts as $post ) :
			setup_postdata( $post );
			//記事リスト
			include (TEMPLATEPATH . '/elements/side_post_list.php');
		endforeach;
		wp_reset_postdata();
		
		?>
	</div>
</aside>