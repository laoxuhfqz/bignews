//获取搜索框输入的搜索条件   从index跳转过来
var key = getUrlParams("key");
//判断是否为 -1 为-1就代表不是搜索文章
if (key == '-1') {
    key = null;
} else {
    //否则就是搜索文章  url参数被编码  需要解码获取真实参数
    //将所有文章查询接口都加上  key 条件
    key = decodeURI(key);
}
//获取文章列表数据
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/article/query',
    data: { key: key },
    success: function (response) {
        //列表
        var html = template('listTpl',
            response.data
        );
        $('#listBox').html(html)
        //分页展示
        var pp = template('pageTpl', { data: response.data })

        $('#pageBox').html(pp)
    }
})

//分页
function changePage(page) {
    //获取文章列表数据
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/article/query',
        data: { page: page, key: key },
        success: function (response) {
            //列表
            var html = template('listTpl',
                response.data
            );
            $('#listBox').html(html)
            //分页展示
            var pp = template('pageTpl', { data: response.data })
            $('#pageBox').html(pp)
        }
    })
}
//获取分类
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/category/list',
    success: function (response) {

        var html = template('categoryTpl', response)

        $('#selCategory').html(html)

    }
})
//给筛选按钮添加submit事件
$('#formBox').on('submit', function () {
    //获取表单内容
    var obj = {};
    if ($('#selCategory').val() != -1) {
        obj.type = $('#selCategory').val()
    }
    if ($('#selStatus').val() != -1) {
        obj.state = $('#selStatus').val()
    }
    if (key != '-1') {
        obj.key = key;
    }


    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/article/query',
        data: obj,
        success: function (response) {
            //列表
            var html = template('listTpl',
                response.data
            );
            $('#listBox').html(html)
            //分页展示
            var pp = template('pageTpl', { data: response.data })
            $('#pageBox').html(pp)
        }
    })
    return false;

})

//删除文章 给文章删除添加事件委托
$('#listBox').on('click', '.delete', function () {
    if (confirm('您真的要进行删除操作吗')) {
        //获取id
        var id = $(this).attr('data-id')
        //发送请求 删除文章内容
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/article/delete',
            data: { id: id },
            success: function (response) {
                alert(response.msg)
                location.reload();
            },
            error: function () {
                alert('删除失败')
            }
        })
    }
})





// 封装一个函数，用于从浏览器的地址栏中获取指定的参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    // 参数不存在，则返回-1
    return -1;
}