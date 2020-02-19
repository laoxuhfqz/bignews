
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

var type= geturlparams('id');

    $.ajax({
        url: 'http://localhost:8080/api/v1/index/search',
        data: {type},
        success: function (response) {
            var html = template('llltpl', {data:response.data.data});

            $('#listBox').html(html)    
        }
    })

