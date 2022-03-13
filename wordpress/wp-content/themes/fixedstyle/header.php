<!DOCTYPE html>
<!--[if lt IE 7]>
<html class="ie6" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7]>
<html class="i7" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8]>
<html class="ie" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 8]><!-->
<html <?php language_attributes(); ?>>
	<!--<![endif]-->
	<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
		<meta charset="<?php bloginfo( 'charset' ); ?>" >
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=yes">
		<meta name="format-detection" content="telephone=no" >
		
		<?php if ( is_home() && !is_paged() ): ?>
			<meta name="robots" content="index,follow">
		<?php elseif ( is_search() or is_404() ): ?>
			<meta name="robots" content="noindex,follow">
		<?php elseif ( !is_category() && is_archive() ): ?>
			<meta name="robots" content="noindex,follow">
		<?php elseif ( is_paged() ): ?>
			<meta name="robots" content="noindex,follow">
		<?php endif; ?>

		<link rel="alternate" type="application/rss+xml" title="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?> RSS Feed" href="<?php bloginfo( 'rss2_url' ); ?>" />
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" >
		<!--[if lt IE 9]>
		<script src="<?php echo esc_url( get_template_directory_uri() ) ; ?>/js/html5shiv.js"></script>
		<![endif]-->
		<?php if ( is_singular() ) wp_enqueue_script( "comment-reply" ); ?>

		<?php
			if (is_category() ){
				$keyword = get_field("keyword","category_".$cat);
				if (!empty($keyword)) { 
					add_filter( 'aioseop_keywords', '__return_false', 100);
					echo '<meta name="keywords"  content="' . $keyword . '" />' . "\n";
				}
				$description = get_field("description","category_".$cat);
				if (!empty($description)) { 
					add_filter( 'aioseop_description', '__return_false', 100);
					echo '<meta name="description"  content="' . $description . '" />' . "\n";
				}
			}
		?>
		<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=<?php theenv('GA_ID'); ?>"></script>
		<script>
		  window.dataLayer = window.dataLayer || [];
		  function gtag(){dataLayer.push(arguments);}
		  gtag('js', new Date());
		
		  gtag('config', '<?php theenv('GA_ID'); ?>');
		</script>
		<?php wp_head(); ?>

		<?php if ( is_category() || is_single()) {
			if (is_single()) {
				$arr = get_field('include',$post->ID);
			} else if (is_category()) {
				$arr = get_field("include","category_".$cat);
			}
			if ($arr) {
				$css = '';
				$js = '';
				foreach ($arr as $data) {
					$url = $data['url'];
					$ext = substr($url, strrpos($url, '.') + 1);
					if (strpos($url, '/') === false) {
						$url = get_stylesheet_directory_uri() . '/' . $ext . '/' . $url;
					}
					if ($ext === 'js') {
						$js .= '<script type="text/javascript" src="' . $url . '"></script>' . "\n";
					} else if($ext === 'css') {
						$css .= '<link rel="stylesheet" href="' . $url . '" type="text/css" media="all" />' . "\n";
					}
				}
			}
/*
			$cusutom_js = get_field('javascript',$post->ID);
			if ($cusutom_js) {
				$js .= '<script>' . htmlspecialchars_decode($cusutom_js, ENT_QUOTES) . '</script>';
			}
			$cusutom_css = get_field('css',$post->ID);
			if ($cusutom_css) {
				$css .= '<style>' . htmlspecialchars_decode($cusutom_css, ENT_QUOTES) . '</style>';
			}
*/
			echo $css . $js;
		} ?>
	</head>
	<body <?php body_class(); ?> >
			<div id="st-ami">
				<div id="wrapper">
				<div id="wrapper-in">
					<header>
						<div id="headbox-bg">
							<div class="clearfix" id="headbox">
									<div id="header-l">
										<!-- ロゴ -->
										<p class="sitename">
											<a href="<?php echo esc_url( home_url( '/' ) ); ?>">
												<img src="<?php echo get_template_directory_uri(); ?>/images/logo_dark.png" alt="fixedstyleロゴ" title="fixedstyleロゴ" />
											</a>
										</p>
										<!-- キャプション -->
										<?php 
											$h1 = '';
											if (is_single()) {
												$h1 = get_field('h1',$post->ID);
											} else if (is_category()) {
												$h1 = get_field("h1","category_".$cat);
											}
											if (empty($h1)) {
												$h1 = get_bloginfo( 'description' );
											}
											echo '<h1 class="descr">' . $h1 . '</h1>';
										?>
									</div><!-- /#header-l -->

									<?php get_template_part( 'st-accordion-menu' ); //アコーディオンメニュー ?>

							</div><!-- /#headbox-bg -->
						</div><!-- /#headbox clearfix -->

						<div id="gazou-wide">
							<?php get_template_part( 'st-header-menu' ); //カスタムヘッダーメニュー ?>

							<?php if ( (get_header_image()) && (is_front_page()) ) : //カスタムヘッダー ?>
							<div id="st-headerbox">
								<div id="st-header">
									<img src="<?php header_image(); ?>" height="<?php echo get_custom_header()->height; ?>" width="<?php echo get_custom_header()->width; ?>" alt="" />
								</div>
							</div>
							<?php endif;?>

						</div>
						<!-- /gazou -->

					</header>
					<div id="content-w">