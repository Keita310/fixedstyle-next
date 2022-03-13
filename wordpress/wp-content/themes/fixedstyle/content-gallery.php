<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/rendering-mode.js"></script>
<!--[if IE]><script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/excanvas.js"></script><![endif]-->
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/radar.js"></script>
<script type="text/javascript">
$(function() {
	var rc = new html5jp.graph.radar("radar_graph");
	if (rc) {
		rc.draw(
			[[
				"商品",
				<?php the_field_value('g_status_popular'); ?>,
				<?php the_field_value('g_design'); ?>,
				<?php the_field_value('g_price'); ?>,
				<?php the_field_value('g_lightweight'); ?>,
				<?php the_field_value('g_quality'); ?>
			]],
			{
				aCap: [
					"人気度",
					"デザイン",
					"安さ",
					"軽量",
					"クオリティ"
				],
				aMax: 5,
				legend:false,
				faceColors:['#006400'],
			}
		);
	}
});
</script>

<div class="detail-complete-bike">

	<div class="col-layout">
		<div class="eyecatch-wrap">
			<div class="eyecatch">
				<?php the_post_thumbnail('full'); ?>
			</div>
		</div>
		<div>
			<h2 class="entry-title">
				<span><?php echo get_the_tags()[0]->name; ?> /</span> <?php the_title(); ?>
			</h2>

			<?php //アフィリリンク
				get_template_part( 'elements/affi_link' );
			?>
		</div>

	</div>

	<div class="content">
		<?php the_content(); //本文の出力 ?>
	</div>

	<h3>「<?php the_title(); ?>」のスペック</h3>

	<div class="col-layout v-align-center detail">
		<div class="">
			<div class="graph">
				<canvas id="radar_graph" width="300" height="300"></canvas>
			</div>
		</div>
		<div class="">
			<div class="spec-area">
				<table>
					<tr>
						<th>メーカー</th>
						<td><?php echo get_the_tags()[0]->name; ?></td>
					</tr>
					<tr>
						<th>参考価格</th>
						<td><?php the_field_value('price'); ?></td>
					</tr>
					<tr>
						<th>重量</th>
						<td>約 <?php the_field_value('weight'); ?> kg</td>
					</tr>
					<tr>
						<th>ステム形状</th>
						<td><?php the_field_value('stem'); ?></td>
					</tr>
					<tr>
						<th>装備ギヤ</th>
						<td><?php echo implode('、', get_field_value('gear')); ?></td>
					</tr>
					<tr>
						<th>フレーム素材</th>
						<td><?php the_field_value('frame_material'); ?></td>
					</tr>
					<tr>
						<th>フォーク素材</th>
						<td><?php the_field_value('fork_material'); ?></td>
					</tr>
					<tr>
						<th>サイズ展開</th>
						<td><?php echo implode('、', get_field_value('g_size')); ?></td>
					</tr>
				</table>
			</div>
		</div>
	</div>

	<?php 
		$official = get_field_value('official');
		if (!empty($official)):
	?>
	<div class="official-link">
		<a rel="nofollow" target="_blank" href="<?php echo $official; ?>">公式ページはこちら</a>
	</div>
	<?php endif; ?>

	<?php
		// 関連ブランド
		$tagObj = get_the_tags()[0];
		$title = $tagObj->name;
		$args = array(
			'posts_per_page' => 4, //表示したい記事数
			'post__not_in' => array($post->ID),
			'tag__in' => array($tagObj->term_id),
			'orderby' => 'rand', //ランダム表示
		);
		$brand_bike = new WP_Query( $args );
		// 関連カテゴリ
		foreach ( get_the_category($post->ID) as $category ) {
			$catId = $category->cat_ID;
			$title = $category->name;
			if ($category->cat_ID !== 36) {
				break;
			}
		}
		$args = array(
			'posts_per_page' => 4, //表示したい記事数
			'post__not_in' => array($post->ID),
			'category__in' => array($catId),
			'orderby' => 'rand', //ランダム表示
		);
		$category_bike = new WP_Query( $args );
		// 出力
		if ($brand_bike->have_posts() || $category_bike->have_posts()) {
			echo '<h3>関連ピストバイク</h3>';
		}
		$st_query = $brand_bike;
		include(TEMPLATEPATH.'/elements/complete_bike_reco_list.php');
		$st_query = $category_bike;
		include(TEMPLATEPATH.'/elements/complete_bike_reco_list.php');
	?>


</div>
