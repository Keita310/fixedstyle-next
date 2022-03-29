<?php
include('env.php');

// 直接アクセスを禁止
if ( !defined( 'ABSPATH' ) ) {
	exit;
}

if ( !function_exists( 'st_after_setup_theme' ) ) {
	/**
	 * テーマの初期設定
	 */
	function st_after_setup_theme() {
		add_theme_support( 'title-tag' );
	}
}
add_action( 'after_setup_theme', 'st_after_setup_theme' );


function dd($content) {
	var_dump($content);exit;
}

/* WP REST APIに独自エンドポイントを追加
****************************************/
function rest_api_wp_query() {
	$thumbnail = isset($_GET['thumbnail']) ? $_GET['thumbnail'] : 'full';
	$data = new WP_Query($_GET);
	foreach ($data->posts as &$p) {
		$data->the_post();
		// カテゴリ
		$p->post_category = get_the_category();
		// タグ
		$p->post_tags = get_the_tags();
		// パーマリンク
		$p->post_permalink = get_the_permalink();
		// 更新日
		$p->post_created_at = get_the_time('Y/m/d');
		$p->post_updated_at = get_the_modified_time('Y/m/d');
		// 抜粋文
		$p->post_excerpt = get_the_excerpt();
		// 画像パス
		$p->post_eyecatch = array(
			'full' => wp_get_attachment_image_src(get_post_thumbnail_id($p->ID), 'full'),
			'st_thumb100' => wp_get_attachment_image_src(get_post_thumbnail_id($p->ID), 'st_thumb100'),
			'st_thumb150' => wp_get_attachment_image_src(get_post_thumbnail_id($p->ID), 'st_thumb150'),
			'st_thumb500' => wp_get_attachment_image_src(get_post_thumbnail_id($p->ID), 'st_thumb500')
		);
		// カスタムフィールド
		$p->custom_field = get_post_custom($p->ID);
	}
	return $data->posts;
}
function add_rest_original_endpoint(){
	//エンドポイントを登録(～wp/custom/query?)
	register_rest_route( 'wp/v2', '/query', array(
		'methods' => 'GET',
		//エンドポイントにアクセスした際に実行される関数
		'callback' => 'rest_api_wp_query',
	));
}
add_action('rest_api_init', 'add_rest_original_endpoint');


/* セッション開始
****************************************/
function init_session_start() {
	if( session_status() !== PHP_SESSION_ACTIVE ) {
		session_start();
	}
}
add_action( 'init', 'init_session_start' );


/* タイトルの調整
****************************************/

// トップページはキャッチフレーズだけにする
add_filter( 'document_title_parts', function($title){
	if ( is_home() || is_front_page() ) {
		unset( $title['title'] );
	}
	return $title;
});

// タイトルの区切りをパイプにする
add_filter( 'document_title_separator', function($sep){
	return '|';
});


/* js、cssの出力
****************************************/

if ( !function_exists( 'st_enqueue_scripts' ) ) {
	/**
	 * スクリプトをキューへ追加
	 */
	function st_enqueue_scripts() {

		wp_deregister_script( 'jquery' );

		wp_enqueue_script(
			'jquery',
			'//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js',
			array(),
			'1.11.3',
			false
		);

		wp_enqueue_script( 'base', get_template_directory_uri() . '/js/base.js', array( 'jquery' ), false, true );

		wp_enqueue_script( 'common_script', get_template_directory_uri() . '/js/common_script.js', array( 'jquery' ), false, true );

		// PCのみ追尾広告のjs読み込み
		wp_enqueue_script(
			'scroll',
			get_template_directory_uri() . '/js/scroll.js',
			array( 'jquery' ),
			false,
			true
		);

	}
}
add_action( 'wp_enqueue_scripts', 'st_enqueue_scripts' );

if ( !function_exists( 'st_enqueue_styles' ) ) {
	/**
	 * CSSをキューへ追加
	 */
	function st_enqueue_styles() {
		wp_register_style(
			'normalize',
			get_template_directory_uri() . '/css/normalize.css',
			array(),
			'1.5.9',
			'all'
		);

		wp_register_style(
			'font-awesome',
			get_template_directory_uri() . '/css/fontawesome/css/font-awesome.min.css',
			array('normalize'),
			'4.5.0',
			'all'
		);

		wp_register_style(
			'style',
			get_stylesheet_uri(),
			array('normalize', 'font-awesome'),
			false,
			'all'
		);

		wp_enqueue_style( 'style' );
	}
}
add_action( 'wp_enqueue_scripts', 'st_enqueue_styles' );

// カスタム背景
$custom_bgcolor_defaults = array(
	'default-color' => '#f2f2f2',
);
add_theme_support( 'custom-background', $custom_bgcolor_defaults );

// カスタムヘッダー
$custom_header = array(
	'random-default' => false,
	'width' => 1060,
	'height' => 300,
	'flex-height' => true,
	'flex-width' => false,
	'default-text-color' => '',
	'header-text' => false,
	'uploads' => true,
	'default-image' => get_stylesheet_directory_uri() . '/images/af.png',
);
add_theme_support( 'custom-header', $custom_header );

if (!function_exists('st_custom_excerpt_length')) {
	/**
	 * 抜粋の長さを変更する
	 */
    function st_custom_excerpt_length($length) {
	$excerptcount = 100;
	return $excerptcount;
    }
}
add_filter( 'excerpt_length', 'st_custom_excerpt_length', 999 );

// 文末文字を変更する
if ( !function_exists( 'st_custom_excerpt_more' ) ) {
	function st_custom_excerpt_more( $more ) {
		return ' ... ';
	}
}
add_filter( 'excerpt_more', 'st_custom_excerpt_more' );

if ( !function_exists( 'st_is_mobile' ) ) {
	/**
	 * スマホ表示分岐
	 */
	function st_is_mobile() {
		$useragents = array(
			'iPhone', // iPhone
			'iPod', // iPod touch
			'Android.*Mobile', // 1.5+ Android *** Only mobile
			'Windows.*Phone', // *** Windows Phone
			'dream', // Pre 1.5 Android
			'CUPCAKE', // 1.5+ Android
			'blackberry9500', // Storm
			'blackberry9530', // Storm
			'blackberry9520', // Storm v2
			'blackberry9550', // Storm v2
			'blackberry9800', // Torch
			'webOS', // Palm Pre Experimental
			'incognito', // Other iPhone browser
			'webmate' // Other iPhone browser

		);
		$pattern = '/' . implode( '|', $useragents ) . '/i';

		return preg_match( $pattern, $_SERVER['HTTP_USER_AGENT'] );
	}
}

if ( !function_exists( 'st_trim_excerpt' ) ) {
	/**
	 * 抜粋を取得/生成
	 *
	 * 本文からの抜粋生成時には全ショートコードを処理
	 *
	 * @param string $text 抜粋
	 *
	 * @return string 抜粋
	 */
	function st_trim_excerpt( $text = '' ) {
		if ( $text !== '' ) {
			return $text;
		}
/*
	$content =  get_the_excerpt();
	$content =  strip_shortcodes($content);
	$content =  strip_tags($content);
	$content =  str_replace("&nbsp;","",$content); 
	$content =  html_entity_decode($content,ENT_QUOTES,"UTF-8");
	$content =  mb_substr($content,0,100);
	echo "<p>" . $content . '…</p>';
*/
		remove_filter('the_content', 'wpautop');
		$text = get_the_content( '' );
		//ショートコード実行させない
		$text =  strip_shortcodes($text);
		//見出しは除去
		$text =  preg_replace("/<h\d.*?<\/h\d>/", "", $text);
		//目次が表示されてしまうからコメントアウト
//		$text = apply_filters( 'the_content', $text );
		$text = str_replace( ']]>', ']]&gt;', $text );

		$excerpt_length = apply_filters( 'excerpt_length', 55 );

		$excerpt_more = apply_filters( 'excerpt_more', ' ' . '[&hellip;]' );
		$text         = wp_trim_words( $text, $excerpt_length, $excerpt_more );

		return $text;
	}
}
add_filter( 'get_the_excerpt', 'st_trim_excerpt', 9 );

// アイキャッチサムネイル
add_theme_support( 'post-thumbnails' );
add_image_size( 'st_thumb100', 100, 100, true );
add_image_size( 'st_thumb150', 150, 150, true );
add_image_size( 'st_thumb500', 500, 250, true );

// カスタムメニュー
add_action( 'init', 'my_custom_menus' );
function my_custom_menus() {
    register_nav_menus(
	   array(
		  'primary-menu' => __( 'ヘッダー用メニュー', 'default' ),
		  'secondary-menu' => __( 'フッター用メニュー', 'default' ),
		  'smartphone-menu' => __( 'スマートフォン用メニュー', 'default' )
	   )
    );
}

// RSS
add_theme_support( 'automatic-feed-links' );

// 管理画面にオリジナルのスタイルを適用
//add_editor_style( 'style.css' );    // メインのCSS
add_editor_style( 'editor-style.css' );

if ( !isset( $content_width ) ) {
	$content_width = 700;
}

if ( !function_exists( 'st_custom_editor_settings' ) ) {
	function st_custom_editor_settings( $initArray ) {
		$initArray['body_id'] = 'primary';    // id の場合はこれ
		$initArray['body_class'] = 'post';    // class の場合はこれ

		return $initArray;
	}
}
add_filter( 'tiny_mce_before_init', 'st_custom_editor_settings' );

// ヘッダーを綺麗に
remove_action( 'wp_head', 'feed_links_extra', 3 );
remove_action( 'wp_head', 'feed_links', 2 );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'index_rel_link' );
remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
remove_action( 'wp_head', 'wp_generator' );

if ( !function_exists( 'st_custom_content_more_link' ) ) {
	/**
	 * moreリンク
	 */
	function st_custom_content_more_link( $output ) {
		$output = preg_replace( '/#more-[\d]+/i', '', $output );

		return $output;
	}
}
add_filter( 'the_content_more_link', 'st_custom_content_more_link' );

if ( !function_exists( 'st_no_self_pingst' ) ) {
	/**
	 * セルフピンバック禁止
	 */
	function st_no_self_pingst( $pung ) {
		$pung[] = home_url();

		return array_unique( $pung );
	}

	apply_filters( 'get_pung', 'st_no_self_pingst' );
}


if ( !function_exists( 'st_wrap_iframe_in_div' ) ) {
	/**
	 * iframeのレスポンシブ対応
	 */
	function st_wrap_iframe_in_div( $the_content ) {
		//YouTube
		$the_content =
		    preg_replace( '/<iframe[^>]+?youtube\.com[^<]+?<\/iframe>/is',
			   '<div
		class="youtube-container">${0}</div>',
			   $the_content );

		return $the_content;
	}
}

if ( !function_exists( 'st_singular_wrap_iframe_in_div' ) ) {
	/**
	 * iframeのレスポンシブ対応 (単一投稿)
	 */
	function st_singular_wrap_iframe_in_div( $the_content ) {
		if ( is_singular() ) {
			$the_content = st_wrap_iframe_in_div( $the_content );
		}

		return $the_content;
	}
}
add_filter('the_content','st_singular_wrap_iframe_in_div');

if ( !function_exists( 'st_register_sidebars' ) ) {
	/**
	 * ウイジェット追加
	 */
	function st_register_sidebars() {

		register_sidebar( array(
				  'id' => 'sidebar-10',
				  'name' => 'サイドバートップ',
				  'description' => 'サイドバーの一番上に表示されるコンテンツエリアです。（タイトルは表示されません）',
				  'before_widget' => '<div>',
				  'after_widget' => '</div>',
				  'before_title' => '<p style="display:none">',
				  'after_title' => '</p>',
			   ) );


		register_sidebar( array(
			'id' => 'sidebar-1',
			'name' => 'サイドバーウイジェット',
			'description' => 'サイドバーに表示されるコンテンツです',
			'before_widget' => '<aside>',
			'after_widget' => '</aside>',
			'before_title' => '<h2 class="widget-title">',
			'after_title' => '</h2>',
		) );

		register_sidebar( array(
			'id' => 'sidebar-2',
			'name' => 'サイド固定ウィジェット',
			'description' => 'サイドバーの下でコンテンツに追尾するボックスエリアです。「テキスト」をここにドロップして内容を入力して下さい。アドセンスは禁止です。※PC以外では非表示部分',
			'before_widget' => '<aside>',
			'after_widget' => '</aside>',
			'before_title' => '<h2 class="widget-title">',
			'after_title' => '</h2>',
		) );

		register_sidebar( array(
			'id' => 'sidebar-3',
			'name' => '広告・Googleアドセンス用300px',
			'description' => 'Googleアドセンス336pxに適したボックスで記事下に2つ連続で表示されます。「テキスト」をここにドロップしてコードを入力して下さい。※タイトルは反映されません',
			'before_widget' => '',
			'after_widget' => '',
			'before_title' => '<p style="display:none">',
			'after_title' => '</p>',
		) );

		register_sidebar( array(
			'id' => 'sidebar-4',
			'name' => '広告・Googleアドセンスのスマホ用300px',
			'description' => 'Googleアドセンス300pxに適したボックスで記事下に1つサイドバーの上に１つショートコードを利用した時のアドセンス時にも挿入されます。「テキスト」をここにドロップしてコードを入力して下さい。タイトルは反映されません。',
			'before_widget' => '',
			'after_widget' => '',
			'before_title' => '<p style="display:none">',
			'after_title' => '</p>',
		) );

		register_sidebar( array(
				  'id' => 'sidebar-9',
				  'name' => '広告・スマホ用記事下のみ',
			'description' => 'スマホのみ記事下に表示されるボックスエリアです。',
				  'before_widget' => '<div class="headbox">',
				  'after_widget' => '</div>',
				  'before_title' => '<p style="display:none">',
				  'after_title' => '</p>',
			   ) );
	}
}
add_action( 'widgets_init', 'st_register_sidebars' );

if ( !function_exists( 'st_get_mtime' ) ) {
	/**
	 * 更新日の追加
	 */
	function st_get_mtime( $format ) {
		$mtime = (int) get_the_modified_time( 'Ymd' );
		$ptime = (int) get_the_time( 'Ymd' );

		if ( $ptime > $mtime ) {
			return get_the_time( $format );
		} elseif ( $ptime === $mtime ) {
			return null;
		} else {
			return get_the_modified_time( $format );
		}
	}
}

if ( !function_exists( 'st_rss_feed_copyright' ) ) {
	/**
	 * RSSに著作権
	 */
	function st_rss_feed_copyright( $content ) {
		$content = $content . '<p>Copyright &copy; ' . esc_html( date( 'Y' ) ) .
				 ' <a href="' . esc_url( home_url() ) . '">' .
				 apply_filters( 'bloginfo', get_bloginfo( 'name' ), 'name' ) .
				 '</a> All Rights Reserved.</p>';

		return $content;
	}
}
add_filter( 'the_excerpt_rss', 'st_rss_feed_copyright' );
add_filter( 'the_content_feed', 'st_rss_feed_copyright' );

if ( !function_exists( 'st_showads' ) ) {
	/**
	 * アドセンス
	 */
	function st_showads() {
		ob_start();
		get_template_part( 'st-ad' );
		$ads = ob_get_clean();
		return $ads;
	}
	add_shortcode( 'adsense', 'st_showads' );
}

if ( !function_exists( 'st_shortcode' ) ) {
	/**
	 * オリジナルショートコード
	 */
	function st_shortcode() {
		ob_start();
		get_template_part( 'st-shortcode' );
		$osc = ob_get_clean();
		return $osc;
	}
	add_shortcode( 'originalsc', 'st_shortcode' );
}

if (!function_exists('st_tiny_mce_before_init')) {
	/**
	 * オリジナルタグ登録
	 */
	function st_tiny_mce_before_init( $init_array ) {
	//書式プルダウンメニューのカスタマイズ
	$init_array['block_formats'] = '段落=p;見出し2=h2;見出し3=h3;見出し4=h4;見出し5=h5;見出し6=h6';
	$init_array['fontsize_formats'] = '70% 80% 90% 120% 130% 150% 200% 250% 300%';
	//自作クラスをプルダウンメニューで追加
	$style_formats = array (
		array( 'title' => '太字', 'inline' => 'span', 'classes' => 'huto' ),
		array( 'title' => '太字（赤）', 'inline' => 'span', 'classes' => 'hutoaka' ),
		array( 'title' => '大文字', 'inline' => 'span', 'classes' => 'oomozi' ),
		array( 'title' => '小文字', 'inline' => 'span', 'classes' => 'komozi' ),
		array( 'title' => 'ドット線', 'inline' => 'span', 'classes' => 'dotline' ),
		array( 'title' => '黄マーカー', 'inline' => 'span', 'classes' => 'ymarker' ),
		array( 'title' => '赤マーカー', 'inline' => 'span', 'classes' => 'rmarker' ),
		array( 'title' => '参考', 'inline' => 'span', 'classes' => 'sankou' ),
		array( 'title' => '写真に枠線', 'inline' => 'span', 'classes' => 'photoline' ),
		array( 'title' => '記事タイトルデザイン', 'block' => 'p', 'classes' => 'entry-title' ),
		array( 'title' => 'code', 'inline' => 'code' ),
		array( 'title' => '吹き出し', 'block' => 'p', 'classes' => 'h2fuu' ),
		array( 'title' => '回り込み解除', 'block' => 'div', 'classes' => 'clearfix' , 'wrapper' => true ),
		array( 'title' => 'センター寄せ', 'block' => 'div', 'classes' => 'center' , 'wrapper' => true ),
		array( 'title' => '黄色ボックス', 'block' => 'div', 'classes' => 'yellowbox' , 'wrapper' => true ),
		array( 'title' => '薄赤ボックス', 'block' => 'div', 'classes' => 'redbox' , 'wrapper' => true ),
		array( 'title' => 'グレーボックス', 'block' => 'div', 'classes' => 'graybox' , 'wrapper' => true ),
		array( 'title' => '引用風ボックス', 'block' => 'div', 'classes' => 'inyoumodoki' , 'wrapper' => true ),
		array( 'title' => 'olタグを囲む数字ボックス', 'block' => 'div', 'classes' => 'maruno' , 'wrapper' => true ),
		array( 'title' => 'ulタグを囲む数字ボックス', 'block' => 'div', 'classes' => 'maruck' , 'wrapper' => true ),
		array( 'title' => 'table横スクロールボックス', 'block' => 'div', 'classes' => 'scroll-box' , 'wrapper' => true ),
		array( 'title' => 'imgインラインボックス', 'block' => 'span', 'classes' => 'inline-img' , 'wrapper' => true ),
		array( 'title' => 'width100%リセット', 'block' => 'span', 'classes' => 'resetwidth' , 'wrapper' => true ),
		array( 'title' => '装飾なしテーブル', 'block' => 'div', 'classes' => 'notab' , 'wrapper' => true ),
		);
	$init_array['style_formats'] = json_encode( $style_formats );
	$init['style_formats_merge'] = false;
	return $init_array;
	}
}
add_filter( 'tiny_mce_before_init', 'st_tiny_mce_before_init' );

if (!function_exists('st_add_orignal_quicktags')) {
	/**
	 * オリジナルクイックタグ登録
	 */
	function st_add_orignal_quicktags() {
		if ( wp_script_is( 'quicktags' ) ) { ?>
			<script type="text/javascript">
				QTags.addButton('ed_p', 'P', '<p>', '</p>');
				QTags.addButton('ed_huto', '太字', '<span class="huto">', '</span>');
				QTags.addButton('ed_hutoaka', '太字（赤）', '<span class="hutoaka">', '</span>');
				QTags.addButton('ed_oomozi', '大文字', '<span class="oomozi">', '</span>');
				QTags.addButton('ed_komozi', '小文字', '<span class="komozi">', '</span>');
				QTags.addButton('ed_dotline', 'ドット線', '<span class="dotline">', '</span>');
				QTags.addButton('ed_ymarker', '黄マーカー', '<span class="ymarker">', '</span>');
				QTags.addButton('ed_rmarker', '赤マーカー', '<span class="rmarker">', '</span>');
				QTags.addButton('ed_sankou', '参考', '<span class="sankou">', '</span>');
				QTags.addButton('ed_photoline', '写真に枠線', '<span class="photoline">', '</span>');
				QTags.addButton('ed_entry', '記事タイトルデザイン', '<p class="entry-title">', '</p>');
				QTags.addButton('ed_code', 'code', '<code>', '</code>');
				QTags.addButton('ed_ads', 'アドセンス', '[adsense]', '');
				QTags.addButton('ed_clearfix', '回り込み解除', '<div class="clearfix">', '</div>');
				QTags.addButton('ed_center', 'センター寄せ', '<div class="center">', '</div>');
				QTags.addButton('ed_yellowbox', '黄色ボックス', '<div class="yellowbox">', '</div>');
				QTags.addButton('ed_redbox', '薄赤ボックス', '<div class="redbox">', '</div>');
				QTags.addButton('ed_graybox', 'グレーボックス', '<div class="graybox">', '</div>');
				QTags.addButton('ed_inyoumodoki', '引用風', '<div class="inyoumodoki">', '</div>');
				QTags.addButton('ed_maruno', 'olタグを囲む数字ボックス', '<div class="maruno">', '</div>');
				QTags.addButton('ed_maruck', 'ulタグを囲むチェックボックス', '<div class="maruck">', '</div>');
				QTags.addButton('ed_scroll_box', 'table横スクロール要素', '<div class="scroll-box">', '</div>');
				QTags.addButton('ed_resetwidth', 'width100%リセット', '<span class="resetwidth">', '</span>');
				QTags.addButton('ed_notab', '装飾なしテーブル', '<div class="notab">', '</div>');
				QTags.addButton('ed_responbox', 'PCのみ左右%ボックス', '<div class="clearfix responbox"><div class="lbox"><p>左側のコンテンツ40%</p></div><div class="rbox"><p>右側のコンテンツ60%</p></div></div>', '');
				QTags.addButton('ed_responbox50s', '全サイズ左右50%ボックス', '<div class="clearfix responbox50 smart50"><div class="lbox"><p>左側のコンテンツ50%</p></div><div class="rbox"><p>右側のコンテンツ50%</p></div></div>', '');
				QTags.addButton( 'ed_ive', 'イベント', "onclick=\"ga('send', 'event', 'linkclick', 'click', 'hoge');\"", '' );
				QTags.addButton( 'ed_nofollow', 'nofollow', " rel=\"nofollow\"", '' );
			</script>
			<?php
		}
	}
}
add_action('admin_print_footer_scripts', 'st_add_orignal_quicktags');



/* admin画面に任意のスクリプトを読み込ませる
****************************************/

function my_jquery($hook) {
	if($hook == 'edit.php'){
		wp_enqueue_script('custom_admin_script', get_bloginfo('template_url').'/js/admin.js', array('jquery'));
	}
}
add_action('admin_enqueue_scripts', 'my_jquery');



/* カスタムメニュー関係
****************************************/

// カスタムメニュー有効化 
register_nav_menus( array(
	'header' => 'ヘッダーナビ',
));
add_theme_support( 'menu' );


/* 投稿フォーマットの有効化＆名称カスタム
****************************************/
add_theme_support( 'post-formats', array( 'aside', 'gallery') );
function post_format_name_change( $text ) {
	if( $text == 'アサイド' ) {
		return '旧ページ';
	} else if ( $text == 'ギャラリー' ) {
		return '完成車';
	} else {
		return $text;
	}
}
add_filter( 'gettext_with_context', 'post_format_name_change' );


/* 旧ソース用本文出力
****************************************/
function old_the_content() {
	remove_filter('the_content', 'wpautop');
	$content = get_the_content();
	$content = do_shortcode($content);
	$content = adjust_img_path($content);
	$content = insert_add($content);
	$content = apply_filters( 'the_content', $content );
	echo $content;
}

/* 旧ソース最適化
****************************************/
function adjust_img_path($content) {

	//内部リンク調整
	$content = preg_replace("/(\.\..*\/)(.*?\/.*?)(\.html)/", home_url() . "/$2/", $content);
	$content = str_replace("/gnav/", "/", $content);
	$content = str_replace("/gear/", "/other/", $content);
	//画像パス調整
	$content = preg_replace("/(\.\.\/\.\.\/|\.\.\/)img/", content_url() . '/static-img', $content);
	//見出し数変換
	$content = preg_replace("/(<|<\/)(h)(\d)/e", "'$1$2' . (intval($3) - 1)", $content);
	//見出しの中のaタグを除去
	$content = preg_replace("/(<h\d)(>|.*?>)(<a .*?>)(.*?)(<\/a>)(<\/h\d>)/s", "$1$2$4$6", $content);
	//https化
	$content = str_replace("http://", "https://", $content);
	//no-sslのクラスがある場合はhttpに戻す
	$content = preg_replace("/(<.*?)(https:)(.*?)(no-ssl)(.*?>)/", '$1http:$3$4$5', $content);

	return $content;
}

/* 旧記事サムネイル取得
****************************************/
function the_old_post_thumbnail() {
	$img = get_old_post_thumbnail();
	echo '<img src="' . $img . '" class="old-thumbnail">';
}
function get_old_post_thumbnail() {
	$slug = basename(get_permalink());
	$cat = get_the_category();
	$cat_name = $cat[0]->category_nicename;
	if ($cat_name === 'parts' || $cat_name === 'trick' || $cat_name === 'movie') {
		$file_name = $slug;
	} else {
		$file_name = 'top';
	}
	$img = content_url() . '/static-img/' . $cat_name  . '/' . $slug . '/' . $file_name . '.jpg';
	return $img;
}


/* サムネイル画像
****************************************/
function get_the_eyecatch($p = false, $size = 'st_thumb100'){
	$reset = true;
	if (!$p) {
		global $post;
		$p = $post;
		$reset = false;
	}
	$args = array(
		'p' => $p->ID,
		'post_status' => array('publish', 'private')
	);
	$st_query = new WP_Query($args);
	if ( $st_query->have_posts() ){
		while ( $st_query->have_posts() ) {
			$st_query->the_post();
			if ( has_post_thumbnail() ) {
				the_post_thumbnail($size);
			// 旧ページの場合
			} else if (get_post_format() === 'aside') {
				the_old_post_thumbnail();
			// サムネイルを持っていないときの処理
			} else {
				echo '<img src="' . get_template_directory_uri() . '/images/no-img.png" alt="no image" title="no image" width="100" height="100" />';
			}
		}
	}
	if ($reset) {
		wp_reset_postdata();
	}
}


/* 自動人間用サイトマップ 現在はWP Sitemap Pageプラグインを使っているので未使用
****************************************/
function simple_sitemap() {
	global $wpdb;
	$args = array('depth'        => 0,
		'show_date'    => NULL,
		'date_format'  => get_option('date_format'),
		'child_of'     => 0,
		'exclude'      => NULL,
		'include'      => NULL,
		'title_li'           => '<span class="subheader">固定ページの一覧</span>',
		'echo'         => 1,
		'authors'      => NULL,
		'sort_column'  => 'menu_order, post_title',
		'link_before'  => NULL,
		'link_after'   => NULL,
		'exclude_tree' => NULL );

	echo '<div id="sitemap"><ul>';
		wp_list_pages($args);
	echo '</ul>';

	$args = array('show_option_all'    => NULL,
		'orderby'            => 'name',
		'order'              => 'ASC',
		'show_last_update'   => 0,
		'style'              => 'list',
		'show_count'         => 0,
		'hide_empty'         => 1,
		'use_desc_for_title' => 1,
		'child_of'           => 0,
		'feed'               => NULL,
		'feed_type'          => NULL,
		'feed_image'         => NULL,
		'exclude'            => NULL,
		'exclude_tree'       => NULL,
		'include'            => NULL,
		'hierarchical'       => true,
		'title_li'           => '<span class="subheader">記事カテゴリ</span>',
		'number'             => NULL,
		'echo'               => 1,
		'depth'              => 0,
		'current_category'   => 0,
		'pad_counts'         => 0,
		'taxonomy'           => 'category',
		'walker'             => 'Walker_Category' );

		echo '<ul>';
		echo wp_list_categories( $args );
		echo '</ul>';
	echo '</div>';
}
add_shortcode('sitemap', 'simple_sitemap');



/* 複数動画出力ショートコード
****************************************/
function multiMovie() {
	$arr = get_field('multi_movie', get_the_ID());
	$list = '';
	foreach ($arr as $data) {
		$src = 'https://www.youtube.com/embed/' . preg_replace('/^.*?=/', '', $data['url']);
		$title = preg_replace('/(^.*?)(\d\d\d\.\d|\d\d\d)(.*?$)/', '$1$2<BR>$3', $data['titile']);
		$fileName = preg_replace('/(^.*?)(\d\d\d\.\d|\d\d\d)(.*?$)/', '$2', $data['titile']);
		$fileName = str_replace(".", "_", $fileName);
		$img = preg_replace('/(^.*\/)(.*?\/.*?)(\.jpg)/', '${1}' . $fileName . '${3}', get_old_post_thumbnail());
$list .= <<< EOM
	<section data-url="{$src}">
		<img src="{$img}" alt="{$data['titile']}" title="{$data['titile']}">
		<div class="caption">
			<h6>{$title}</h6>
			<p>{$data['description']}</p>
		</div>
	</section>
EOM;
		if (!isset($main)) {
$main = <<< EOM
	<iframe width="100%" height="500" src="{$src}" frameborder="0" allowfullscreen></iframe>
	<h4>{$data['titile']}</h4>
	<p>{$data['description']}</p>
EOM;
		}
	}
return <<< EOM
<div id="movie_main" class="multi-movie-main">
{$main}
</div>
<h5>シリーズ一覧</h5>
<div id="movie_list" class="multi-movie-list">
{$list}
</div>
EOM;
}
add_shortcode('multimovie', 'multiMovie');

/* トリック難易度星ショートコード
****************************************/
function trickLevel($atts) {
	extract(shortcode_atts(array(
		'rate' => 0,
	), $atts));

	$stars = '';
	$max = $rate / 0.5;
	$odd = false;
	for ($i=1; $i<=$max; $i++) {
		if ($i % 2 == 0) {
			$stars .= '<i class="fa fa-star"></i>';
			$odd = false;
		} else {
			$odd = true;
		}
	}
	if ($odd) {
		$stars .= '<i class="fa fa-star-half"></i>';
	}
	return '<h6>難易度</h6><div class="trick-level"><div class="bg"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></div><div class="level">' . $stars . '</div></div>';
}
add_shortcode('level', 'trickLevel');


/* カスタム抜粋
****************************************/
function the_custom_excerpt($length = 100) {
	$content =  get_the_excerpt();
	$content =  strip_shortcodes($content);
	$content =  preg_replace("/<h\d.*?<\/h\d>/", "", $content);
	$content =  strip_tags($content);
	$content =  str_replace("&nbsp;","",$content); 
	$content =  html_entity_decode($content,ENT_QUOTES,"UTF-8");
	$content =  mb_substr($content,0, $length);
	echo "<p>" . $content . '…</p>';
}

/* 目次挿入とアンカー埋め込み
****************************************/
function get_index_list($content) {

	if(strpos($content,'[get_index_list]') === false){
		return $content;
	}

	$html = "";
	$list = "";
	$child_list = "";
	$depth1Count = 0;
	$depth2Count = 0;

	preg_match_all('/<h[3|4].*?<\/h[3-4]>/',$content, $matches);
	if($matches[0]){
		foreach($matches[0] as $key => $midasi){
			//画像見出しは排除
			if(strpos($midasi,"<img") !== false){
				continue;
			}
			$key++;
			//アンカー埋め込み
			$after = preg_replace('/(<h[3-4])(>)/','$1'." id=\"link{$key}\"".'$2',$midasi);
			$content = str_replace($midasi,$after,$content);

			//目次構築
			$tpl = "<a href=\"#link{$key}\"><span class=\"toc_number toc_depth_##depth##\">##depthCount##</span> " . strip_tags($midasi) . '</a>';
			if(strpos($midasi,"</h4>") !== false){
				$depth2Count++;
				$tpl = str_replace("##depth##", "2", $tpl);
				$tpl = str_replace("##depthCount##", "{$depth1Count}.{$depth2Count}", $tpl);
				$child_list .= "\t\t\t<li>{$tpl}</li>\n";
			} else {
				if(!empty($child_list)){
					$list .= "\n\t\t<ul>\n{$child_list}\t\t</ul>\n\t</li>\n";
					$child_list = "";
					$depth2Count = 0;
				} else if(!empty($list)){
					$list .= "</li>\n";
				}
				$depth1Count++;
				$tpl = str_replace("##depth##", "1", $tpl);
				$tpl = str_replace("##depthCount##", $depth1Count, $tpl);
				$list .= "\t<li>{$tpl}";
			}
		}
		if(!empty($child_list)){
			$list .= "\t\t<ul>{$child_list}\n\t\t</ul></li>\n";
		}
	}
	if($list){
		$html .= '<div id="toc_container" class="no_bullets"><p class="toc_title">目次</p>';
		$html .= '<ul class="toc_list">' . $list . '</li></ul>';
		$html .= '</div>';
	}

	$content = str_replace('[get_index_list]',$html,$content);
	return $content;
}

/* 指定記事ID順ソート
****************************************/
function post_id_sort($my_posts, $config) {
	//記事ID指定があったら指定した順にソート
	if (isset($config['include']) && count($config['include']) > 0) {
		$sorted_posts = array();
		foreach ( $my_posts as $post ) {
			$key = array_search($post->ID, $config['include']);
			$sorted_posts[$key] = $post;
		}
		ksort($sorted_posts);
		$my_posts = $sorted_posts;
	}
	return $my_posts;
}


/* 本文途中アドセンス挿入
****************************************/
function insert_add($content) {
	$ad_client = getenv('AD_CLIENT');
	$ad_slot = getenv('AD_SLOT');
$html = <<< EOM
  <div class="middle-ad">
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- fixedstyle 記事内上部 -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="{$ad_client}"
         data-ad-slot="{$ad_slot}"
         data-ad-format="auto"></ins>
    <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  </div>
EOM;
	preg_match_all("/(<h3)(>|.*?>)(.*?<\/h3>)/s", $content, $matches, PREG_SET_ORDER);
	$count = count($matches);
	if ($count > 3) {
		$key = floor($count / 2);
		$target = $matches[$key][0];
		$content = str_replace($target, $html . $target, $content);
	}
	return $content;
}



/* ウィジェットタイトルのHTMLタグ許可
****************************************/
add_filter('widget_title', "my_widget_title", 10, 3 ); 
function my_widget_title($title){
	$title = preg_replace('/(\[)(.*?)(\])/', '<i class="fa fa-$2"></i>', $title);
	return $title;
}

/* ウィジェットカテゴリの指定カテゴリ除外
****************************************/
add_filter('widget_categories_args', 'my_theme_catexcept',10);
function my_theme_catexcept($cat_args){
	$cat_args['depth'] = 1;
	return $cat_args;
}

/* ウィジェットタグクラウドの指定カテゴリに属するタグを除去
****************************************/
add_filter( 'widget_tag_cloud_args', 'my_widget_tag_cloud_args');
function my_widget_tag_cloud_args( $args) {
	$posts = get_posts(array(
		'category__in' => 36,
		'posts_per_page' => -1
	));
	$exclude = array();
	foreach ($posts as $p){
		$exclude[] = get_the_tags($p->ID)[0]->term_id;
	}
	wp_reset_postdata();

	$args['exclude'] = implode(",", $exclude);
	return $args;
}



/* カスタムフィールド値取得
****************************************/
function get_field_value($key) {
	$fields = get_field_object($key);
	if (!empty($fields)) {
		if (is_array($fields['value'])) {
			$value = array();
			foreach ($fields['value'] as $key) {
				$value[] = $fields['choices'][$key];
			}
			return $value;
		} else {
			$value = $fields['value'];
			if (isset($fields['choices'])) {
				return $fields['choices'][$value];
			} else {
				return $value;
			}
		}
	} else {
		return null;
	}
}
function the_field_value($key) {
	echo get_field_value($key);
}

/* 公開状態か
****************************************/
function isPublish($id = false){
	if (!$id) {
		$id = $post->ID;
	}
	return get_post_status($id) === 'publish';
}

/* env値をechoする
****************************************/
function theenv($key, $default = null){
	$value = getenv($key);
	if ($value) {
		echo $value;
	} else {
		echo $default;
	}
}

/* csrf_tokenをechoする
****************************************/
function the_csrf_token(){
	$_SESSION['_csrf_token'] = md5(uniqid(rand(), true));
	echo $_SESSION['_csrf_token'];
}
