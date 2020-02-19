//添加表单提交事件
$('.search_form form').on('submit', function () {
    var keys = $('#search').val();
    location.href = "/search.html?key=" + keys
    return false;
})



// 最新评论数据
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/latest_comment',
    success: function (response) {


        var commentTpl = `
        {{each data}}
        <li>
            <span>中</span>
            <b><em>{{$value.author}}</em> {{$value.date}}说:</b>
            <strong>{{$value.intro}}</strong>
          </li>
          {{/each}}
        `;
        var html = template.render(commentTpl, {
            data: response.data
        });
        $('#commentpinlun').html(html);

    }
});

// 焦点关注数据
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/attention',
    success: function (response) {

        var commentTpl = `
        {{each data}}
        <li><a href="#">{{$value.intro}}</a></li>
          {{/each}}
        `;
        var html = template.render(commentTpl, {
            data: response.data
        });
        $('#commentguanzhu').html(html);

    }
})

// 热点排行数据
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/rank',
    success: function (response) {

        var commentTpl = `
        {{each data}}
        <li><span>{{$index+1}}</span><a href="">{{$value.title}}</a></li>
          {{/each}}
        `;
        var html = template.render(commentTpl, {
            data: response.data
        });
        $('#commentpaihang').html(html);

    }
})

// 文章列表数据
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/search',
    success: function (response) {
        var html = template('wenzhang', {
            data: response.data.data
        });
        $('#listBox').html(html);
    }
})



//文章分类数据
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/category',
    success: function (response) {
        var navTpl = `
        <li class="up"></li>
        {{each data}}
        <li><a href="list.html?categoryID={{$value.id}}">{{$value.name}}</a></li>
        {{/each}}
        `;
        var html = template.render(navTpl, {
            data: response.data
        });
        $('#navBox').html(html);
        $('#navBoxa').html(html);

    }
})