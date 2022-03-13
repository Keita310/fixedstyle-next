<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=utf-8");

	$url = $_POST['url'];
//	$url = "http://fixedstyle.web.fc2.com/parts/parts/bb.html";
	$page = file_get_contents($url);

	$page = str_replace("\r","",$page);
	$page = str_replace("\n","<kaigyo>",$page);

	$arr = array();
	//タイトル
	$arr["title"] = preg_replace("/(^.*?)(<h3>)(.*?)(<\/h3>)(.*?$)/", '$3', $page);
	//h1
	$arr["h1"] = preg_replace("/(^.*?)(<h1>)(.*?)(<\/h1>)(.*?$)/", '$3', $page);
	//keyword
	$arr["keyword"] = preg_replace('/(^.*?)(<meta name="keywords" content=")(.*?)(")(.*?$)/', '$3', $page);
	//description
	$arr["description"] = preg_replace('/(^.*?)(<meta name="description" content=")(.*?)(")(.*?$)/', '$3', $page);
	//コンテンツ用調整
	$content = $page;
	//liveAdsはhttps化対応していないから削除
	$content = preg_replace('/(<div id="live-ads">)(.*?)(<\/div>)/', '', $content);
	//通常
	$content = preg_replace('/(^.*?<div id="index">.*?<\/div>.*?<\/div>)(.*?)(<div id="footer-nav".*?$)/', '$2', $content);
	//用語集用
	$content = preg_replace('/(^.*?)(<dl>.*?<\/dl>)(.*?$)/', '$2', $content);
	//動画用
	$content = preg_replace('/(^.*?<\/h3>)(.*?)(<div class="thumbnail">.*?$)/', '$2', $content);
	$content = preg_replace('/(<div class="thumbnail_d">)(.*?)(<\/div>.*?<\/div>.*?<\/div>)/', '', $content);
	$content = preg_replace('/(<iframe width=")(.*?)(" height=")(.*?)(".*?>)/', '${1}100%${3}500${5}', $content);
	$content = str_replace("<kaigyo>","\n",$content);
	$content = str_replace("\n\n\n\n","",$content);
	$arr["content"] = $content;

	//更新日を取得
	$xml_url = "http://fixedstyle.web.fc2.com/sitemap.xml";
	$page = file_get_contents($xml_url);
	$page = str_replace("\r","",$page);
	$page = str_replace("\n","<kaigyo>",$page);
	$replace = "/(^.*?<loc>" . str_replace("/","\/",$url) . "<\/loc>.*?<lastmod>)(.*?)(<\/lastmod>.*?$)/";
	$date = preg_replace($replace, '$2', $page);
	$arr["date"] = explode("-", $date);
//	$arr["date"] =explode("-","2010-03-15");


	//カテゴリ取得
	if (strpos($url,"/parts/") !== false) {
		$cat = 5;
	} else if (strpos($url,"/trick/") !== false) {
		$cat = 6;
	} else if (strpos($url,"/movie/") !== false) {
		$cat = 3;
	} else if (strpos($url,"/other/") !== false) {
		$cat = 25;
	} else if (strpos($url,"/about_pist/") !== false) {
		$cat = 26;
	} else if (strpos($url,"/glossary/") !== false) {
		$cat = 29;
	}
	$arr["cat"] = $cat;
	//パーマリンク名取得
	$arr["link"] = preg_replace('/(^.*\/)(.*?)(\.html$)/', '$2', $url);

	if (strpos($url,"/weird_pista") !== false) {
		$arr["youtube_url"] = 'https://www.youtube.com/watch?v=' . preg_replace('/(^.*?)(embed\/)(.*?)(")(.*?$)/s', '$3', str_replace("\n", "", $content));
		$arr["youtube_title"] = $arr["title"];
		$arr["youtube_description"] = preg_replace('/(<div class="object-position_d">)(.*?)(<\/div>)/s', '', $content);
		$arr["youtube_description"] = strip_tags(preg_replace("/(<br>|<\/p>)/","\n",str_replace("\n", "" ,$arr["youtube_description"])));
	}

	mb_convert_variables('UTF-8','SJIS-win',$arr);
	$json = json_encode( $arr );
	echo $json;
	exit;

?>