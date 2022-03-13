<?php get_header(); ?>

<div id="content" class="clearfix">
	<div id="contentInner">
		<div class="st-main">
			<?php
				// パンくず
				get_template_part( 'elements/pankuzu' );
			?>
			<article>
				<!--ループ開始-->
				<h2 class="entry-title">「
					<?php if ( is_category() ) { ?>
						<?php single_cat_title(); ?>
					<?php } elseif ( is_tag() ) { ?>
						<?php single_tag_title(); ?>
					<?php } elseif ( is_tax() ) { ?>
						<?php single_term_title(); ?>
					<?php } elseif ( is_day() ) { ?>
						日別アーカイブ：<?php echo get_the_time( 'Y年m月d日' ); ?>
					<?php } elseif ( is_month() ) { ?>
						月別アーカイブ：<?php echo get_the_time( 'Y年m月' ); ?>
					<?php } elseif ( is_year() ) { ?>
						年別アーカイブ：<?php echo get_the_time( 'Y年' ); ?>
					<?php } elseif ( is_author() ) { ?>
						投稿者アーカイブ：<?php echo esc_html( get_queried_object()->display_name ); ?>
					<?php } elseif ( isset( $_GET['paged'] ) && !empty( $_GET['paged'] ) ) { ?>
						ブログアーカイブ
					<?php } ?>
					」 一覧 </h2>

				<?php
					$eyecatch = get_field("eyecatch","category_".$cat);
					if ($eyecatch) {
						echo '<img src="' . $eyecatch['url'] . '" alt="' . $eyecatch['alt'] . '" title="' . $eyecatch['title'] . '">';
					}
				?>

				<?php if(is_category('complete_bike')) : ?>

					<?php get_template_part( 'elements/complete_bike_content' ); ?>

				<?php else : ?>

					<?php 
					//	remove_filter('the_content', 'wpautop');
						$content = get_field("freespace","category_".$cat); 
//						$content = do_shortcode($content);
//						$content = apply_filters( 'the_content', $content );
						$content = get_index_list($content);
						echo $content;
					?>

					<?php get_template_part( 'itiran' ); //投稿一覧読み込み ?>
					<?php get_template_part( 'st-pagenavi' ); //ページナビ読み込み ?>

				<?php endif; ?>


			</article>
		</div>
	</div>
	<!-- /#contentInner -->
	<?php get_sidebar(); ?>
</div>
<!--/#content -->
<?php get_footer(); ?>
