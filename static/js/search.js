function geturlparams(name) {
    var paramsary = location.search.substring(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsary.length; i++) {
        var tmp = paramsary[i].split('=');
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    // 如果参数不存在就返回-1
    return -1
}
key = geturlparams('key');
//判断是否为 -1 为-1就代表不是搜索文章
if (key == '-1') {
    key = null;
} else {
    //否则就是搜索文章  url参数被编码  需要解码获取真实参数
    //将所有文章查询接口都加上  key 条件
    key = decodeURI(key);
}

$.ajax({
    url: 'http://localhost:8080/api/v1/index/search',
    data: { key },
    success: function (response) {
        var html = template('searchtpl', { data: response.data.data });
        $('#listBox').html(html)

    }
})
