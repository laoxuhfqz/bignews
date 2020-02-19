//前台首页的导航
$.ajax({
    url: 'http://localhost:8080/api/v1/index/article',
    success: function (response) {
       
            console.log(response);
            
            var hh = template('typetpl', response);
            console.log(hh);
            
            // $('typebox').html(hh)
            
        
    }

})