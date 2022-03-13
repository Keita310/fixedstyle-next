<div id="content">

	<div class="eyecatch">
		<?php if(has_post_thumbnail()):?>
		<?php the_post_thumbnail('full'); ?>
		<?php endif; ?>
	</div>

	<?php get_template_part( 'st-ad-on' ); //広告 ?>

	<?php //本文の出力
	$content = apply_filters('the_content',get_the_content());
	$content = do_shortcode($content);
	$content = get_index_list($content);
	echo $content;
	?>

</div><!--//#content-->