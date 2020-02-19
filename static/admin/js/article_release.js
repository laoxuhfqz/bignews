//获取所有文章类别
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/category/list',
    success: function (response) {
        // console.log(response);

        var html = template('categoryTpl', { data: response.data })
        // console.log(html);

        $('#article_category').html(html);

    }
})

//当选择文件时触发
$('#exampleInputFile').on('change', function () {
    var file = this.files[0]
    var imgURL = URL.createObjectURL(file)
    $('#preview').prop('src', imgURL);
    // $('#example1').val(imgURL)
})

//给发布按钮添加点击事件
$('#publish').on('click', function () {
    var dataTime = +new Date();
    var inputTime = +new Date($('#dateinput').val());
    if (inputTime > dataTime) {
        alert('您输入的时间不正确,请重新输入');
        return false;
    }
    var formData = new FormData($('#article_form')[0]);
    //表单控件的第一个元素
    console.log($('#article_category').find('option:selected').attr('data-id'))

    formData.append('categoryId', $('#article_category').find('option:selected').attr('data-id'));
    formData.append('content', tinyMCE.activeEditor.getContent().replace(/<[^<>]+>/g, ''));
    formData.append('state', $("#publish").val());

    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/article/publish',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            console.log(result);
            console.log('成功发布');
            location.href = '/admin/article_list.html'
        }
    })
    return false;
})