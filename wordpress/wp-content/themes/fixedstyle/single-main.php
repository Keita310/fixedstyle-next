<?php get_header(); ?>

<div id="content" class="clearfix">
	<div id="contentInner">

		<div class="st-main">

			<?php
				// パンくず
				get_template_part( 'elements/pankuzu' );
			?>

			<div id="post-<?php the_ID(); ?>" <?php post_class('st-post'); ?>>
				<article>
					<!--ループ開始 -->
					<?php if (have_posts()) : while (have_posts()) :
					the_post(); ?>
					
					<?php //カテゴリ表示
					if ( isset($GLOBALS['stdata60']) && $GLOBALS['stdata60'] === 'yes' ) {

					} else {

						$categories = get_the_category();
						$separator = ' ';
						$output = ''; ?>
					<p class="st-catgroup">
					<?php
						if ( $categories ) {
							foreach( $categories as $category ) {
								$output .= '<a href="' . get_category_link( $category->term_id ) . '" title="' 
								. esc_attr( sprintf( "View all posts in %s", $category->name ) ) 
								. '" rel="category tag"><span class="catname st-catid' . $category->cat_ID . '">' . $category->cat_name . '</span></a>' . $separator;
								}
							echo trim( $output, $separator );
						} ?>
					</p>
					<?php
					} //カテゴリ表示ここまで
					?>

					<h2 class="entry-title"><?php the_title(); //タイトル ?></h2>

					<div class="blogbox">
						<p><span class="kdate">
							<?php if ( get_the_date() != get_the_modified_date() ) : //更新がある場合 ?>
								投稿日：<?php echo esc_html( get_the_date() ); ?>
								更新日：<time class="updated" datetime="<?php echo esc_attr( get_the_modified_date( DATE_ISO8601 ) ); ?>"><?php echo esc_html( get_the_modified_date() ); ?></time>
							<?php else: //更新がない場合 ?>
								投稿日：<time class="updated" datetime="<?php echo esc_attr( get_the_date( DATE_ISO8601 ) ); ?>"><?php echo esc_html( get_the_date() ); ?></time>
							<?php endif; ?>
						</span></p>
					</div>

					<div class="mainbox">
						<div class="entry-content">
						<?php //content-aside.phpなどの投稿フォーマット用テンプレートを呼び出す
						get_template_part( 'content', get_post_format() ); ?>
						</div>
						<?php get_template_part( 'st-ad-on' ); //広告 ?>

						<?php //ページ改
								$defaults = array(
								'before'           => '<p class="tuzukicenter"><span class="tuzuki">' . __( '', 'default' ),
								'after'            => '</span></p>',
								'link_before'      => '&gt;&ensp;',
								'link_after'       => '&ensp;',
								'next_or_number'   => 'next',
								'separator'        => ' ',
								'nextpagelink'     => __( '続きを読む', 'default' ),
								'previouspagelink' => __( '前のページへ', 'default' ),
								'pagelink'         => '%',
								'echo'             => 1
								);
								wp_link_pages( $defaults );
						?>
					</div><!-- .mainboxここまで -->

						<?php get_template_part( 'sns' ); //ソーシャルボタン読み込み ?>

						<p class="tagst">
							<i class="fa fa-folder-open-o" aria-hidden="true"></i>-<?php the_category( ', ' ) ?><br/>
							<?php the_tags( '<i class="fa fa-tags"></i>-', ', ' ); ?>
						</p>

					<?php endwhile; else: ?>
						<p>記事がありません</p>
					<?php endif; ?>
					<!--ループ終了-->
				</article>

				<div class="st-aside">

					<?php if ( comments_open() || get_comments_number() ) {
						comments_template(); //コメント
					} ?>

					<?php //ページナビ prev / next
					get_template_part( 'elements/prev_next' ); ?>

					<?php //関連記事
					get_template_part( 'kanren' ); ?>

				</div><!-- /st-aside -->

			</div><!--/post-->

		</div><!-- /st-main -->
	</div>
	<!-- /#contentInner -->
	<?php get_sidebar(); ?>
</div>
<!--/#content -->
<?php get_footer(); ?>
