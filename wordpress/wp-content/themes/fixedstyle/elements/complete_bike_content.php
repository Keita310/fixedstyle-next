<?php
/**
 * 完成車一覧のメインコンテンツ
 */
?>

<div class="old-content post">
	<?php
		ob_start();
		echo get_field("freespace","category_".$cat); 
		$categories = get_categories(array(
			'hide_empty' => false,
			'parent' => 36,
			'order' => 'ASC',
			'orderby' => 'term_order'
		));
		foreach ($categories as $category) {
	?>
		<?php 
			$args = array(
				'category__in' => array($category->term_id),
//				'post_status'  => 'any',
//				'orderby' => 'meta_value',//term_order これでカテゴリの並び替えした順になる？
//				'order' => 'ASC',
//				'meta_key' => 'category'
			);
			$st_query = new WP_Query( $args ); 
			if ( $st_query->have_posts() ):
		?>
			<h4><?php echo $category->name; ?></h4>
			<?php
				while ( $st_query->have_posts() ) : $st_query->the_post();
			?>
				<?php get_the_tags(); ?>
				<h5><?php echo get_the_tags()[0]->name; ?> / <?php echo str_replace('非公開: ', '', get_the_title()); ?></h5>
				<div class="big-eyecatch">
					<?php if (isPublish()): ?>
						<a href="<?php the_permalink();?>">
							<?php get_the_eyecatch(null, 'full'); ?>
						</a>
					<?php else: ?>
						<?php get_the_eyecatch(null, 'full'); ?>
					<?php endif; ?>
				</div>
				<?php the_content(); ?>
				<?php //アフィリリンク
					get_template_part( 'elements/affi_link' );
				?>
			<?php endwhile; ?>

		<?php endif; ?>
		<?php wp_reset_postdata(); ?>


	<?php }
		$contents = ob_get_clean();
		$contents = get_index_list($contents);
		echo $contents;
	?>
</div>
