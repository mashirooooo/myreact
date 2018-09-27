define(['jquery'], function($){
    $('.s_li').mouseenter(function(e){
        $(this).children('.s_none_r').css({display:'block'})
    })
    $('.s_li').mouseleave(function(e){
        $(this).children('.s_none_r').css({display:'none'})
    })
    $('.s_nav_title').mouseenter(function(e){
       $('.s_nav_none').css({display:'block'})
    });
    $('.s_nav_l').mouseleave(function(e) {
        $('.s_nav_none').css({display:'none'})
    });
    $('.s_searchtxt').focus(function(e){
        $('.s_searchtxt').val("")
    });
    $('.s_searchtxt').blur(function(e){
        $('.s_searchtxt').val("实木茶具")
    });
})

