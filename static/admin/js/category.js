$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/category/list',
    success: function (response) {
        if (response.code == 200) {
            var html = template('categorytpl', response);
            $('#categorybox').html(html);

        }
    }
})

//新增分类
$('#model_add').on('click', function () {
    var data = $('#addcategory').serialize();
    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/category/add',
        type: 'post',
        data: data,
        success: function (result) {
            location.reload()
        }
    })

})

$('#categorybox').on('click', '.edit', function () {
    var id = $(this).data('id');

    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/category/search',
        data: { id },
        success: function (result) {
            $('#addModal').modal('show');
            var html = template('modifytpl', result);
            $('#modifybox').html(html);
        }
    })
})

$('#modifybox').on('click', '#model_modify', function () {
    var data = $('#modifycategory').serialize();
    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/category/edit',
        type: 'post',
        data: data,
        success: function (result) {
            location.reload()
        }
    })
})

$('#addModal').on('click', '#shutoff', function () {
    $('#addModal').modal('hide')
})


$('#categorybox').on('click', '.delete', function () {
    var id = $(this).siblings('.edit').data('id');
    if (confirm('您确定删除这个分类吗')) {
        $.ajax({
            url: 'http://localhost:8080/api/v1/admin/category/delete',
            type: 'post',
            data: {id},
            success: function (response) {
                $.ajax({
                    type: 'get',
                    url: 'http://localhost:8080/api/v1/admin/category/list',
                    success: function (response) {
                        if (response.code == 200) {
                            var html = template('categorytpl', response);
                            $('#categorybox').html(html);
                
                        }
                    }
                })
            }
        })
    }
})