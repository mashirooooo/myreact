require(['config'],function(){
    require(['jquery','http',],function($,http){
        $(function(){
            $('#on').click(function(){
                 //判断账户密码是否为空
                if($('#phone')[0].value ==''|| $('#password')[0].value==''){
                    alert('账号密码不能为空');
                    return false;
                }
                if(!/^[a-z0-9\-]{5,16}$/.test($('#password').val())){
                    alert('请输入6-16位密码'); 
                    return false;
                }
                if($('#password').val() !== $('.pwd1').val()){
                    alert('请输入一样的密码');
                    return false;
                }
                $.post('/register',{
                    username: $('#phone').val(),
                    password: $('#password').val()
                }, function(res){
                    if(res.status){
                        alert('注册成功！');
                        location.href = './login.html'; 
                    } else {
                        alert(JSON.stringify(res));
                    }
                })                 
            }) 
        })
    })
})



