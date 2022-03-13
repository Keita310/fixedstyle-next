<div id="side">
	<div class="st-aside">

		<?php if ( is_active_sidebar( 10 ) ) { ?>
			<div class="side-topad">
				<?php if ( function_exists( 'dynamic_sidebar' ) && dynamic_sidebar( 10 ) ) : else : //サイドバートップのみのウィジェット ?>
				<?php endif; ?>
			</div>
		<?php } ?>

		<div id="mybox">
			<?php 
				$config = array(
					'list_title'		=> '人気コンテンツ',
					'label'				=> 'side-post-favorite',
					'font-awesome'		=> 'star',
					'posts_per_page'	=> 3,
					'include'			=> sga_ranking_get_date()	//アナリティクスからランキングを記事IDで取得
				);
				include (TEMPLATEPATH . '/side_post.php');
			?>
			<?php 
				$config = array(
					'list_title'		=> '新着コンテンツ',
					'label'				=> 'side-post-latest',
					'font-awesome'		=> 'leaf',
					'posts_per_page'	=> 3,
					'category__not_in'	=> 36, //完成車は除く
					'orderby'			=> 'date',
					'order'				=> 'DESC'
				);
				include (TEMPLATEPATH . '/side_post.php');
			?>
			<?php if ( is_active_sidebar( 1 ) ) { ?>
				<?php if ( function_exists( 'dynamic_sidebar' ) && dynamic_sidebar( 1 ) ) : else : //サイドウイジェット読み込み ?>
				<?php endif; ?>
			<?php } ?>

			<div id="scrollad">
				<?php if ( is_active_sidebar( 2 ) ) { ?>
					<?php if ( function_exists( 'dynamic_sidebar' ) && dynamic_sidebar( 2 ) ) : else : ?>
					<?php endif; ?>
				<?php } ?>
			</div>

		</div>
	</div>
</div>
<!-- /#side -->
