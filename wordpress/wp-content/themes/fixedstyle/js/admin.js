(function($) {
    $(function(){
        // アフィリ更新ボタンを設置する
        $('#the-list tr').map(function(){
            var id = $(this).attr('id').replace(/post-/, '');
            $(this).append('<td><span class="button action update-affi" data-id="' + id + '"><span class="standby">更新する</span><span class="doing hidden">更新中…</span><span class="done hidden">更新完了</span></span></td>');
        });
        // ヘッダタイトル
        $('.wp-list-table thead tr').append('<th scope="col" class="manage-column">アフィリ更新</th>');
        // 更新実行
        $('.update-affi').click(function(){
            var _this = $(this);
            var id = _this.attr('data-id');
            btnStatus(_this, 'doing');
            $.ajax({
                type: "GET",
                url: '/wp-content/themes/fixedstyle/cron/update_affi.php?id=' + id,
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
            }).done(function(data) {
                console.log(data);
                if (data.indexOf('"status":"ok"') != -1) {
                    btnStatus(_this, 'done');
                } else {
                    console.log(data);
                    alert("更新失敗");
                }
                setTimeout(function(){
                    btnStatus(_this, 'standby');
                },3000);
            }).fail(function(data) {
                console.log(data);
                alert("想定外のエラーが発生しました。");
                btnStatus(_this, 'standby');
            });
        });

        // 指定のボタンを表示させる
        var btnStatus = function(obj,status) {
            obj.find('.standby,.done,.doing').addClass('hidden');
            obj.find('.' + status).removeClass('hidden');
        };

    });
})(jQuery);
