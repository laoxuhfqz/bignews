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


