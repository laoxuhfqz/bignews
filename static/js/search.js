$('#btn').on('click', function () {
    var dataform = $('#searchform').serialize();
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/search',
        data: dataform,
        success: function (response) {
            if (response.code == 200) {
                console.log(response);
                
            }
        }
    })
    
})