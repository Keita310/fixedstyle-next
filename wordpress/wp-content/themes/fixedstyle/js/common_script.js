$(function(){
	// サブミット
	$('#searchsubmit').click(function(){
		$('#searchform').submit();
	});

	//weird_pista記事専用
	if (isPost(316)) {
		//クリックで動画を切り替える
		$("#movie_list section").click(function(){
			$("#movie_main iframe").attr("src", $(this).attr("data-url"));
			$("#movie_main h3").text($(this).find("h5").text());
			$("#movie_main p").html($(this).find("p").html());
			var position = $("#movie_main").offset().top;
			$("html, body").animate({scrollTop:position - 20}, 500, "swing");
		});
	}

	//診断専用
	if (isPost(653)) {
		// answerフラグ
		var showedAnswer = false;
		// 結果枠を用意
		$('#question_wrap').after('<div id="result_bike"></div>');

		$('#choices').on('DOMSubtreeModified propertychange', function (){
			setTimeout(function(){
				var q = $('#question_wrap dt span').text().replace(/[^0-9^\.]/g,"");
				if (q == 1) {
					$('#choices').css({"opacity":"1"}).show();
					$('#back').css({"display":"none"});
					$('#back_button').val('');
				} else if (q > 1) {
					$('#back_button').val(q - 1);
				}
			}, 100);
		});
		// 結果の文字列が入ったら結果画面表示
		$('#question_wrap dt span').on('DOMSubtreeModified propertychange', function (){
			$('#question_wrap dt').show();
			var _this = $(this);
			setTimeout(function(){
				var bike = _this.text();
				if (bike.indexOf('answer:') != -1 && !showedAnswer) {
					showedAnswer = true;
					$('#question_wrap dt').hide();
					console.log(bike);
					$.ajax({
						type: "GET",
						url: "/wp-content/themes/fixedstyle/api/result_bike/",
						dataType: "json",
						data: {
							bike: bike
						},
						headers: {
							'X-Requested-With': 'XMLHttpRequest',
							'X-Csrf-Token': $('#_csrf_token').val()
						},
						success: function(data) {
							if (data.html.length > 0) {
								$('#result_bike').html(data.html).fadeIn(1000, function() {
									$('#choices').hide();
								});
							}
						},
						error: function(jqXHR, textStatus, errorThrown) {
							alert('エラー');
							console.log(jqXHR);
							console.log(textStatus);
							console.log(errorThrown);
						}
					});
				}
			}, 100);

		});
		// 戻るボタン　クリックでchoices内のボタンをクリックしたことにする
		$(document).on('click', '#return_first', function() {
			$('#back_button').val('1').trigger('click');
			// スムーススクロール
			var position = $('#yesno_wrap').offset().top - 50;
			$("html, body").animate({scrollTop:position}, 1000, "swing");
			$('#result_bike').fadeOut(300, function() {
				$(this).empty().show();
			});
			showedAnswer = false;
		});
	}

});

// 指定記事だったら
var isPost = function (id) {
	if ($('body').hasClass("postid-" + id)) {
		return true;
	}
	return false;
};