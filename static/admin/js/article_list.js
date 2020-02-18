//获取文章列表数据
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/article/query',
    success: function (response) {



        //列表
        var html = template('listTpl',
            response.data
        );
        $('#listBox').html(html)
        //分页展示
        var pp = template('pageTpl', response.data)


        $('#pageBox').html(pp)
    }
})

//分页
function changePage(page) {
    //获取文章列表数据
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/article/query',
        data: { page: page },
        success: function (response) {

            //列表
            var html = template('listTpl',
                response.data
            );
            $('#listBox').html(html)
            //分页展示
            var pp = template('pageTpl', response.data)
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
    //console.log($("#selCategory").val());
    var obj = {};
    if ($('#selCategory').val() != -1) {
        obj.type = $('#selCategory').val()
    }
    if ($('#selStatus').val() != -1) {
        obj.state = $('#selStatus').val()
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
            var pp = template('pageTpl', response.data)
            $('#pageBox').html(pp)
        }
    })
    return false;

})
