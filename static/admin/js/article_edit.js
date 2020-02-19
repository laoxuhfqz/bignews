// 获取浏览器地址栏中的id
var id = getUrlParams('id');
//获取文章编辑信息
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/article/search',
    data: { id: id },
    success: function (response) {
        //200为查询成功
        if (response.code === 200) {
            //查询类别
            $.ajax({
                type: 'get',
                url: 'http://localhost:8080/api/v1/admin/category/list',
                success: function (result) {
                    response.data.category = result.data;

                    var html = template('modifyTpl', response.data);
                    $("#modifyBox").html(html);
                }
            })


        }

    }


})
//文件上传
$('#modifyBox').on('change', '#exampleInputFile', function () {
    var file = this.files[0];
    var imgURL = URL.createObjectURL(file);
    console.log(imgURL);

    // img标签的src属性 
    $('.article_cover').prop("src", imgURL);

});


//表单提交
$('#modifyBox').on('submit', '#modifyForm', function () {
    //获取用户选择的文件
    let formData = new FormData();
    formData.append("id", $("#id").val());
    formData.append("title", $("#inputEmail3").val());
    formData.append("categoryId", $("#categoryId").val());
    formData.append("date", $("#dateinput").val());
    formData.append("content", $("#rich_content").val());
    formData.append("cover", $("#exampleInputFile")[0].files[0]);


    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/article/edit',
        data: formData,
        processData: false,
        contentType: false,
        success: function () {
            alert('修改成功')
            location.href = '/admin/article_list.html'
        },
        error: function () {
            alert('修改失败')
        }

    })
    return false;
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
