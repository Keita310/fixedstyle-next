<?php
/**
 * パンくず
 */
?>

<?php if ( is_author() ) { //投稿者アーカイブ ?>
	<section id="breadcrumb">
	<ol>
		<li><a href="<?php echo home_url(); ?>"><span>HOME</span></a> >  </li>
		<li><?php the_author_meta('display_name', get_query_var('author')); ?></li>
	</ol>
	</section>
<?php } elseif(is_attachment()){ //添付ファイル ?>
	<section id="breadcrumb">
	<ol>
		<li><a href="<?php echo home_url(); ?>"><span>HOME</span></a> >  </li>
		<?php if($post -> post_parent != 0 ): ?> > 
			<li><a href="<?php echo get_permalink($post -> post_parent); ?>"><?php echo get_the_title($post -> post_parent); ?></a> > </li>
		<?php endif; ?>
			<li><?php echo $post -> post_title; ?></li>
	</ol>
	</section>
<?php } elseif(is_date()){ //日付アーカイブ ?>
	<section id="breadcrumb">
	<ol>
		<li><a href="<?php echo home_url(); ?>"><span>HOME</span></a> >  </li>

		<?php if(is_day()): //日別アーカイブ ?>
			<li><a href="<?php echo get_year_link(get_query_var('year')); ?>"><?php echo get_query_var('year'); ?>年</a> > </li>
			<li><a href="<?php echo get_month_link(get_query_var('year'), get_query_var('monthnum')); ?>"><?php echo get_query_var('monthnum'); ?>月</a> > </li>
			<li><?php echo get_query_var('day'); ?>日</li>
		<?php elseif(is_month()): //月別アーカイブ ?>
			<li><a href="<?php echo get_year_link(get_query_var('year')); ?>"><?php echo get_query_var('year'); ?>年</a> > </li>
			<li><?php echo get_query_var('monthnum'); ?>月</li>
		<?php elseif(is_year()): //年別アーカイブ ?>
			<li><?php echo get_query_var('year'); ?>年</li>
		<?php endif; ?>
	</ol>
	</section>
<?php } else { ?>

	<?php
		// HOME
		$childs = array(
			array(
				'link' => home_url(),
				'name' => 'HOME'
			)
		);
		// タグ
		if (is_tag()) {
			$tag_obj = get_queried_object();
			$childs[] = array(
				'link' => get_tag_link($tag_obj->term_id),
				'name' => $tag_obj->name
			);
		// ページ
		} elseif (is_page()){
			$childs[] = array(
				'link' => get_the_permalink(),
				'name' => get_the_title()
			);
		// カテゴリ
		} elseif (is_category() || is_archive()) {
			$catid = get_query_var('cat');
			if( !$catid ){
				$cat_now = get_the_category();
				$cat_now = $cat_now[0];
				$catid  = $cat_now->cat_ID;
			}
			$allcats = array( $catid );
			while ( !$catid == 0 ) {    /* すべてのカテゴリーIDを取得し配列にセットするループ */
				$mycat = get_category( $catid );    /* カテゴリーIDをセット */
				$catid = $mycat->parent;    /* 上で取得したカテゴリーIDの親カテゴリーをセット */
				array_push( $allcats, $catid );
			}
			array_pop( $allcats );
			$allcats = array_reverse( $allcats );
			foreach ( $allcats as $catid ) {
				$childs[] = array(
					'link' => get_category_link( $catid ),
					'name' => esc_html( get_cat_name( $catid ))
				);
			}
		// その他、記事等
		} else {
			$postcat = get_the_category();
			$catid = $postcat[0]->cat_ID;
			$allcats = array( $catid );
			while ( !$catid == 0 ) {
				$mycat = get_category( $catid );
				$catid = $mycat->parent;
				array_push( $allcats, $catid );
			}
			array_pop( $allcats );
			$allcats = array_reverse( $allcats );
			foreach ( $allcats as $catid ) {
				$childs[] = array(
					'link' => get_category_link( $catid ),
					'name' => esc_html( get_cat_name( $catid ))
				);
			}
			$childs[] = array(
				'link' => get_the_permalink(),
				'name' => get_the_title()
			);
		}
	?>

	<section id="breadcrumb">
		<ol itemscope itemtype="http://schema.org/BreadcrumbList">
			<?php foreach ($childs as $i => $child): $i = ((int)$i + 1); ?>
				<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
					<?php if (count($childs) !== $i): ?>
						<a href="<?php echo $child['link']; ?>" itemprop="item">
							<span itemprop="name"><?php echo $child['name']; ?></span>
						</a> &gt; 
					<?php else: ?>
						<span itemprop="name"><?php echo $child['name']; ?></span>
					<?php endif; ?>
					<meta itemprop="position" content="<?php echo $i; ?>" />
				</li>
			<?php endforeach; ?>
		</ol>
	</section>

<?php } ?>
