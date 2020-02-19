//前台首页的导航
$.ajax({
    url: 'http://localhost:8080/api/v1/index/category',
    success: function (response) {
        if (response.code == 200) {
            var arr = response.data.slice(0, 6);
            var categorytpl = `
            {{each}}<li><a href="article.html?id={{$value.id}}" data-id="{{$value.id}}">{{$value.name}}</a></li>{{/each}}
            `;
            var categortpl = `
            {{each}}<li><a href="article.html?id={{$value.id}}" data-id="{{$value.id}}">{{$value.name}}</a></li>{{/each}}
            `
            var newarr1 = [];
            var newarr2 = []
            for (var i = 0; i < arr.length; i++) {
                if (i < arr.length - 2) {
                    newarr1.push(arr[i])
                } else {
                    newarr2.push(arr[i])
                }
            }

            var html1 = template.render(categorytpl, newarr1);
            var html2 = template.render(categortpl, newarr2);
            $('#downcategory1').html(html1);
            $('#downcategory2').html(html1)
            $('#downcategory3').html(html2)
        }
    }

})
//获取资讯
$.ajax({
    url: 'http://localhost:8080/api/v1/index/latest',
    success: function (response) {
        if (response.code == 200) {
            var html = template('informationtpl', response);
            $('#informationbox').html(html)
        }
    }
})

//获取评论
$.ajax({
    url: 'http://localhost:8080/api/v1/index/latest_comment',
    success: function (response) {
        if (response.code == 200) {
            var commentstpl = `
            {{each data}}
            <li>
            <span>{{$value.author.substring(0,1)}}</span>
            <b><em>{{$value.author}}</em>{{$imports.formatedate($value.date)}}说:</b>
            <strong>{{$value.intro}}</strong>
          </li>{{/each}}
            `
            var html = template.render(commentstpl, response);
            $('#commentsbox').html(html)

        }
    }
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

//获取图片
$.ajax({
    url: 'http://localhost:8080/api/v1/index/hotpic',
    success: function (response) {
        if (response.code == 200) {
            var tupiantpl = `
            {{each data}}
            <li class="{{$index==0?'first':''}}">
            <a href="article.html?id={{$value.id}}"><img src="{{$value.cover}}" alt=""></a>
            <p>{{$value.title}}</p>
          </li>{{/each}}
            `
            var html = template.render(tupiantpl, response);
            $('#tupianbox').html(html);
            
            
        }
    }
})

