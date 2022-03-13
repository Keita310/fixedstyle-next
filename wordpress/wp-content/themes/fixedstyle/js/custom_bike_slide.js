$(function(){
	$.ajax({
		type: "GET",
		url: "/wp-content/themes/fixedstyle/api/custom_bike/",
		dataType: "json",
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			'X-Csrf-Token': $('#_csrf_token').val()
		},
		success: function(data) {
			// HTML
			var html;
			for(var i in data.Items){
				//	console.log(data.Items[i].Item);return false;
				html = "";
				html += '<div class="swiper-slide">';
				html += '<div class="img_wrap">';
				html += '<a href="' + data.Items[i].Item.affiliateUrl + '" target="_blank">';
				html += '<img src="' + data.Items[i].Item.mediumImageUrls[0].imageUrl.replace('?_ex=128x128','').replace('http', 'https') + '" alt="' + data.Items[i].Item.catchcopy + '">';
				html += '</a>';
				html += '</div>';
				html += '<p class="caption">';
				html += '<a href="' + data.Items[i].Item.affiliateUrl + '" target="_blank">';
				html += data.Items[i].Item.catchcopy.replace(/ピストバイク カスタム完成車 /g,"").replace(/ PISTBIKE/g,"");
				html += '</a>';
				html += '</p>';
				html += '</div>';
				$('.swiper-wrapper').append(html);
			}
			// slick
			$('.swiper-wrapper').slick({
				autoplay: true,
				dots:true,
				slidesToShow: 2,
				slidesToScroll: 2,
				swipe: true,
				responsive: [
					{
						breakpoint: 500,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		},
		error: function(jqXHR, textStatus, errorThrown) {
			$('.custom_wrap').remove();
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
});
