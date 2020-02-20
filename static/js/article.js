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

var id = geturlparams('id');
$.ajax({
    url: 'http://localhost:8080/api/v1/index/article',
    data: { id },
    success: function (response) {
        var html = template('articletpl', response.data);
        $('#articlebox').html(html)

    }
})



// 评论功能
$('#commentForm').on('submit', function () {
    // 获取表单信息
    var username = $('.comment_name').val()
    var comment = $('.comment_input').val()
    $.ajax({
        url: "http://localhost:8080/api/v1/index/post_comment",
        type: 'post',
        data: {
            author: username,
            content: comment,
            articleId: id
        },
        success: function (res) {
            if (res.code == 201) {
                alert('评论成功')
                location.reload()
            }

        }
    })
    // 阻止表单默认提交
    return false;
})




function formatedate(date) {
    var date = new Date(date)
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
}



//获取焦点
$.ajax({
    url: 'http://localhost:8080/api/v1/index/attention',
    success: function (response) {
        if (response.code == 200) {
            var guanzhutpl = `
            {{each data}}
            <li><a href="article.html?id={{$value.id}}">{{$value.intro}}</a></li>{{/each}}
            `
            var html = template.render(guanzhutpl, response);
            $('#guanzhubox').html(html)
        }
    }
})

//获取排行
$.ajax({
    anync: false,
    url: 'http://localhost:8080/api/v1/index/rank',
    success: function (response) {
        if (response.code == 200) {
            var paihangtpl = `
{{each data}}
<li><span class="{{$index+1==1?'first':$index+1==2?'second':$index+1==3?'third':''}}">{{$index+1}}</span><a href="article.html?id={{$value.id}}">{{$value.title}}</a></li>{{/each}}
            `
            var html = template.render(paihangtpl, response);
            $('#paihangbox').html(html)

        }
    }
})

// 获取评论数据
$.ajax({
    url: "http://localhost:8080/api/v1/index/get_comment",
    type: 'get',
    data: {
        articleId: id
    },
    success: function (res) {
        console.log(res);
        var length = res.data.length
        // 数据模板拼接
        var html = template('listTpl', {
            data: res.data
        })
        $('#listBox').html(html)
        $('#commentCount').html(length + '条评论')
    }
})



