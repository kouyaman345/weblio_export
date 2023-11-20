(function(){

    var id = [
        "TTG",  //単語
        "THT",  //発音記号
        "THn",  //品詞
        // "TIM",  //単語の意味
        "TIML",  //単語の意味
        "TSRH",    //例文
        "TSRFL",  //例文訳
        "TLV",  //レベル
        // "TDT"   //登録日
        // "TSRFR",  //出典
    ];
    var csv = [];

    for(var i = 0; i < id.length; i++) {
        var td = $('.tngMain' + id[i]);
        var line = [];
        td.each(function(){
            var cn = $(this).text().replace(/[\n\r]/g,"");
            console.log(cn);
            // var cn = $(this).text();
            line.push(cn);
        });
        csv.push(line);
    };

    if(csv){
        $('#csv').remove();
        csv = transpose(csv);
        downCsv(csv);
    }

    function transpose(a) {
        return Object.keys(a[0]).map(function (c) {
            return a.map(function (r) {
                // console.log(r[c]);
                return r[c];
            });
        });
    }

// download
function downCsv(csv){
    var csvbuf = csv.map(function(e){
        return e.map(function(f){
            if (f !== undefined) {  // fがundefinedでないことを確認
                return '"' + f.replace(/"/g, '""') + '"';  // フィールドをエスケープ
            } else {
                return '""';  // fがundefinedの場合は空の文字列を返す
            }
        }).join(',');
    }).join('\r\n');
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    var blob = new Blob([bom, csvbuf], { type: 'text/csv' });
    var url = (window.URL || window.webkitURL).createObjectURL(blob);
    var fileName = $('.headTbUlL').text() + '.csv';

    $('<a>').attr('href', url).attr('download', fileName).text('エクスポート').attr('id', 'csv').prependTo($('body'));
}

})();