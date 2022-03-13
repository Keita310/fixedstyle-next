<div class="eyecatch">
	<?php if ( !in_category(array('movie')) ) : ?> 
		<?php if(has_post_thumbnail()):?>
			<?php the_post_thumbnail('full'); ?>
		<?php else: ?>
			<?php the_old_post_thumbnail() ?>
		<?php endif; ?>
	<?php endif; ?>
</div>

<?php get_template_part( 'st-ad-on' ); //広告 ?>

<div class="old-content">
	<?php old_the_content(); //本文の出力 ?>
</div><!--//.old-content-->
