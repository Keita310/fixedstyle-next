<?php
/**
 * ページナビ
 */
?>

<nav class="prev-next">
	<ul>
	<?php $prevpost = get_adjacent_post(true, '', true); if ($prevpost) : ?>
		<li class="prev">
			<a href="<?php echo get_permalink($prevpost->ID); ?>">
				<?php //サムネイル画像出力
				get_the_eyecatch($prevpost); ?>
				<p><?php echo esc_attr($prevpost->post_title); ?></p>
			</a>
		</li>
	<?php endif; ?>
	<?php $nextpost = get_adjacent_post(true, '', false); if ($nextpost) : ?>
		<li class="next">
			<a href="<?php echo get_permalink($nextpost->ID); ?>">
				<?php //サムネイル画像出力
				get_the_eyecatch($nextpost); ?>
				<p><?php echo esc_attr($nextpost->post_title); ?></p>
			</a>
		</li>
	<?php endif; ?>
	</ul>
</nav>

