				</div><!-- /contentw -->
				<footer>
					<div id="footer">
						<div id="footer-in">

							<div class="left-contents">
								<p class="sitename">
									<a href="<?php echo esc_url( home_url( '/' ) ); ?>">
										<img src="<?php echo get_template_directory_uri(); ?>/images/logo_light.png" alt="fixedstyleロゴ" title="fixedstyleロゴ" />
									</a>
								</p>
								<p class="discription"><?php bloginfo( 'description' ); ?></p>
							</div>
							<div class="right-contents">
								<?php //フッターメニュー
								$defaults = array(
									'theme_location'  => 'secondary-menu',
									'container'       => 'div',
									'container_class' => 'footermenubox clearfix ',
									'menu_class'      => 'footermenust',
									'depth'           => 1,
								);
								wp_nav_menu( $defaults );
								?>
								<p class="copy">&copy;
								<?php bloginfo( 'name' ); ?>
								,
								<?php echo date( 'Y' ); ?>
								All Rights Reserved.</p>
							</div>

						</div>
					</div>
				</footer>
			</div><!-- /#wrapperin -->
		</div><!-- /#wrapper -->
	</div><!-- /#st-ami -->
	<div id="page-top">
		<a href="#wrapper" class="fa fa-angle-up"></a>
	</div>
<?php wp_footer(); ?>
<input type="hidden" id="_csrf_token" name="_csrf_token" value="<?php the_csrf_token(); ?>">
</body>
</html>
