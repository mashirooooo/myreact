require(['config'], function($, http){
    require(['jquery', 'http'], function($, http){
        $(function(){
            $('.submitbtn').click(function(){
                //ajax
                http.post('/login', {
                    phone: $('#phone').val().trim(),
                    password: $('#password').val().trim()
                }).then(function(res){
                    if(res.status){
                        alert('登录成功');
                        location.href = './index.html'; 
                    }else{
                        alert(res);
                    }
                })
            })
        })
    })  
})



