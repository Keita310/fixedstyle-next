<div id="search">
	<form method="get" id="searchform" action="<?php echo esc_url( home_url( '/' ) ); ?>">
		<label class="hidden" for="s">
			<?php __( '', 'default' ); ?>
		</label>
		<input type="text" placeholder="キーワードを入力" value="<?php the_search_query(); ?>" name="s" id="s" />
		<div id="searchsubmit"><i class="fa fa-search"></i></div>
	</form>
</div>
<!-- /stinger --> 