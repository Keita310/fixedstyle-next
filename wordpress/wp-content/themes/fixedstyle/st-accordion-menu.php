<?php
/**
 * アコーディオンメニュー
 */
 ?>
<nav id="s-navi" class="pcnone">
	<div class="acordion">
		<div class="trigger">
			<p><span class="op"><i class="fa fa-bars"></i></span></p>
		</div>

		<div class="acordion_tree">
			<?php
			if ( has_nav_menu( 'smartphone-menu' ) ) : 
				$defaults = array(
					'theme_location' => 'smartphone-menu',
				);
			else : 
				$defaults = array(
					'theme_location' => 'primary-menu',
				);
			endif;?>
			<?php wp_nav_menu( $defaults ); ?>
			<div class="clear"></div>

		</div>
	</div>
</nav>
