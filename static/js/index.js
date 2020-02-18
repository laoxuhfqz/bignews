//前台首页的导航
$.ajax({
    url: 'http://localhost:8080/api/v1/index/category',
    success: function (response) {
        if (response.code == 200) {
            var categorytpl = `
            {{each}}<li><a href="javascript:;" data-id="{{$value.id}}">{{$value.name}}</a></li>{{/each}}
            `;
            var categortpl = `
            {{each}}<li><a href="javascript:;" data-id="{{$value.id}}">{{$value.name}}</a></li>{{/each}}
            `
            var newarr1 = [];
            var newarr2=[]
            for (var i = 0; i < response.data.length; i++){
                if (i <response.data.length-2) {
                    newarr1.push(response.data[i])
                } else {
                    newarr2.push(response.data[i])
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
            console.log(html);
            
            $('#informationbox').html(html)
            
        }
    }
})