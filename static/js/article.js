function geturlparams(name) {
    var paramsary = location.search.substring(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsary.length; i++){
        var tmp = paramsary[i].split('=');
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    // 如果参数不存在就返回-1
    return -1
}
var id = geturlparams('id');
$.ajax({
    url: 'http://localhost:8080/api/v1/index/article',
    data: {id},
    success: function (response) {
        var html = template('articletpl', response.data);
        $('#articlebox').html(html)    
    }
})




