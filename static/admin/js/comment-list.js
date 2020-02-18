// 发送请求 获取评论信息
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/comment/search',
    success: function (res) {
        // console.log(res);
        // var data = res.data.data;
        // console.log(data);
        //渲染页面
        var html = template('commentTpl', { data: res.data.data });
        // console.log(html);
        $('#commentBox').html(html)
        //渲染分页模板
        var ss = template('fenyeTpl', res);
        $('#fenyeBox').html(ss)
    }
})

//评论分页功能
var p = '';
function changePage(page) {
    // console.log(page);
    p = page;
    // 获取评论信息
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/comment/search',
        data: { page: page },
        success: function (res) {
            // console.log(res);
            var html = template('commentTpl', { data: res.data.data });
            $('#commentBox').html(html);
            //渲染分页模板
            var ss = template('fenyeTpl', res);
            $('#fenyeBox').html(ss);
        }
    })
}




//删除评论
$('#commentBox').on('click', '.delete', function () {
    // alert('OK')
    //获取要删除的评论的id
    var id = $(this).attr('data-id')
    // console.log(id);
    //删除确认
    if (confirm('您真的要删除么?')) {
        // 发送请求删除数据
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/comment/delete',
            data: { id: id },
            success: function () {
                getComment();
            }
        })
    }
})

//评论审核拒绝
$('#commentBox').on('click', '.editN', function () {
    //获取要删除的评论的id
    var id = $(this).attr('data-id');
    // console.log(id);
    //发送请求拒绝评论
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/comment/reject',
        data: { id: id },
        success: function (res) {
            // console.log(res.msg);
            getComment();
        }
    })
})

//评论审核通过
$('#commentBox').on('click', '.editY', function () {
    //获取要删除的评论的id
    var id = $(this).attr('data-id');
    // console.log(id);
    //发送请求同意评论
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/comment/pass',
        data: { id: id },
        success: function () {
            getComment();
        }
    })
})

//设置渲染页面评论数据的函数
function getComment() {
    // 发送请求 获取评论信息
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/comment/search',
        data: { page: p },
        success: function (res) {
            var html = template('commentTpl', { data: res.data.data });
            $('#commentBox').html(html)
            //渲染分页模板
            var ss = template('fenyeTpl', res);
            $('#fenyeBox').html(ss);
        }
    })
}