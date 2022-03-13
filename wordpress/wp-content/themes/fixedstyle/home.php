<?php get_header(); ?>

<div id="content" class="clearfix">
	<div id="contentInner">
		<div class="st-main">


			<style>

				.banner-recomends {
					
				}
				.banner-recomends ul {
					margin: 0 0 16px;
					padding: 0;
					list-style-type: none;
					overflow: hidden;
				}
				.banner-recomends ul li{
					float: left;
					width: 50%;
					padding: 5px;
					box-sizing: border-box;
					display: table-cell;
				}
				.banner-recomends ul li a{
					color: #FFF;
					display: block;
					position: relative;
					text-align: center;
				}
				.banner-recomends ul li a:after{
					background: #000;
					width: 100%;
					height: 100%;
					content: ' ';
					display: block;
					position: absolute;
					top: 0;
					left: 0;
					opacity: 0.5;
				}
				.banner-recomends ul li img{
					width: 100%;
				}
				.banner-recomends ul li span {
					margin: -6px 0 0;
					position: absolute;
					top: 50%;
					left:0;
					right: 0;
					z-index: 10;
				}
				@media only screen and (max-width: 601px) {
					.banner-recomends ul li{
						width: 100%;
						padding:5px 0;
					}

				}
			</style>

			<div class="banner-recomends">
				<ul>
					<li>
						<a href="https://fixedstyle.net/complete_bike/">
							<img src="https://fixedstyle.net/wp-content/uploads/2018/03/complete_bike-500x250.jpg">
							<span>ピストバイク完成車の選び方</span>
						</a>
					</li>
					<li>
						<a href="https://fixedstyle.net/other/gear/">
							<img src="https://fixedstyle.net/wp-content/uploads/2012/02/gear-500x250.jpg">
							<span>ピストバイクギヤ比</span>
						</a>
					</li>
					<li>
						<a href="https://fixedstyle.net/beginner/about_pist/">
							<img src="https://fixedstyle.net/wp-content/uploads/2010/04/about_pist-500x250.jpg">
							<span>ピストについて</span>
						</a>
					</li>
					<li>
						<a href="https://fixedstyle.net/customize/custom_brake/">
							<img src="https://fixedstyle.net/wp-content/uploads/2016/01/brake-500x250.jpg">
							<span>ブレーキのカスタマイズ</span>
						</a>
					</li>
				</ul>
			</div>

			<article>
				<div class="st-aside">
					<?php
						query_posts( array('category__not_in' => 36) );
						get_template_part( 'itiran' );
						wp_reset_query();
					?>
					<?php get_template_part( 'st-pagenavi' ); //ページナビ読み込み ?>
				</div>

					<?php get_template_part( 'sns-top' ); //ソーシャルボタン読み込み ?>

			</article>
		</div>
	</div>
	<!-- /#contentInner -->
	<?php get_sidebar(); ?>
</div>
<!-- /#content -->
<?php get_footer(); ?>