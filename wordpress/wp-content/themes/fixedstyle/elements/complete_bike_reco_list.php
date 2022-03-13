<?php
/**
 * 完成車詳細ページの関連バイクリスト
 */
?>

<?php
//	こんな感じで渡す
//
//	$tagObj = get_the_tags()[0];
//	$title = $tagObj->name;
//	$args = array(
//		'posts_per_page' => 4, //表示したい記事数
//		'post__not_in' => array($post->ID),
//		'tag__in' => array($tagObj->term_id),
//		'orderby' => 'rand', //ランダム表示
//	);
//	$st_query = new WP_Query( $args );
?>

<?php if ( $st_query->have_posts() ): ?>
	<h4>「<?php echo $title; ?>」のピストバイク</h4>
	<div class="reco-bike-list">
		<?php while ( $st_query->have_posts() ) : $st_query->the_post(); ?>
			<dl>
				<dt><a href="<?php the_permalink() ?>">
						<?php if ( has_post_thumbnail() ): // サムネイルを持っているときの処理 ?>
							<?php the_post_thumbnail( 'thumbnail' ); ?>
						<?php elseif(get_post_format() === 'aside'): // 旧ページの場合 ?>
							<?php the_old_post_thumbnail(); ?>
						<?php else: // サムネイルを持っていないときの処理 ?>
							<img src="<?php echo get_template_directory_uri(); ?>/images/no-img.png" alt="no image" title="no image" width="100" height="100" />
						<?php endif; ?>
					</a></dt>
				<dd>
					<p class="title">
						<a href="<?php the_permalink(); ?>">
							<?php the_title(); ?>
						</a>
					</p>
				</dd>
			</dl>
		<?php endwhile; ?>
	</div>
<?php endif; ?>
<?php wp_reset_postdata(); ?>