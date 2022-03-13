<ul class="aff-link">
	<?php
		$affiliates = get_field('affiliate'); 
		if (!empty($affiliates)):
			$title = get_field('search_word');
			foreach ($affiliates as $affiliate):
				if (!empty($affiliate['data'])):
					$items = json_decode(base64_decode($affiliate['data']), true);
					foreach($items as $item):
						if (!empty($item)):
							// 商品のステータスを配列に入れる(クラスになる)
							// 在庫なしフラグ
							$status_label = '';
							$hidden_flag = false;
							if ($item['status'] === 'empty') {
								$status_label .= '<span class="empty">在庫なし</span>';
								// 在庫なし非表示
								if (!empty($affiliate['stock_empty_hidden']) && array_search($item['mall_key'], $affiliate['stock_empty_hidden']) !== false) {
									$status_label .= '<span class="no_display">在庫なし非表示</span>';
									$hidden_flag = true;
								}
							}
							// 表示フラグ
							if (!$affiliate['display']) {
								$status_label .= '<span class="stock_empty_hidden">非表示</span>';
								$hidden_flag = true;
							}
							// 通常はラベルなし、非表示発動
							if (!is_user_logged_in()) {
								$status_label = '';
								// 非表示
								if ($hidden_flag) {
									continue;
								}
							}
							?>
								<li>
									<span class="label"><?php echo $status_label; ?></span>
									<a class="img" href="<?php echo $item['url']; ?>" rel="nofollow" target="_blank">
										<?php if(!empty($item['img'])): ?>
											<img src="<?php echo $item['img']; ?>" alt="<?php echo $affiliate['search_word']; ?>を<?php echo $item['mall']; ?>で購入する">
										<?php else: ?>
											<img src="<?php echo get_template_directory_uri(); ?>/images/no_image.gif" alt="<?php echo $affiliate['search_word']; ?>を<?php echo $item['mall']; ?>で購入する">
										<?php endif; ?>
									</a>
									<a class="text" href="<?php echo $item['url']; ?>" rel="nofollow" target="_blank">
										<span class="title"><?php echo $affiliate['search_word']; ?></span>
										<span class="btn <?php echo $item['mall_key']; ?>"><?php echo $item['mall']; ?></span>
									</a>
								</li>
							<?php
						endif;
					endforeach;
				endif;
			endforeach;
		endif;
	?>
</ul>
