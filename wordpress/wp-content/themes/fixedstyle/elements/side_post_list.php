<?php
/**
 * サイドバー用の関連記事1枠テンプレート
 */
?>
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
		<p class="kanren-t"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></p>
		<div class="smanone2">
			<?php the_custom_excerpt(30); ?>
		</div>
	</dd>
</dl>
