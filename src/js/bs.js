$(function(){

    $('.s_sp').click(function(){

        $('.s_li2').toggle();
    })
    $('.s_sp1').click(function(){

        $('.s_ul2').toggle();
    })
    $('.s_sp2').click(function(){

        $('.s_ul3').toggle();
    })
    $('.s_sp3').click(function(){

        $('.s_ul4').toggle();
    })
    // 供应商
    $('.s_li2').click(function(){
        alert('傻逼供应商跑路了')
    })

    // 待付款
    $($('.s_ul2 li')[0]).click(function(){
        $('.dfk').toggle();
    })
    $('.s_cspan').click(function(){
        $('.dfk').toggle();
    })

    $('.s_dfkcbtn').click(function(){
        if(confirm('确定取消待付款订单吗？')){
            $('.s_dfkdd').css({display:'none'})
        }
    })

    // 未付款
    $($('.s_ul2 li')[1]).click(function(){
        $('.wfk').toggle();
    })
     $('.s_cspan1').click(function(){
        $('.wfk').toggle();
    })

    $('.s_wfkbtn').click(function(){
        alert('已成功跟踪订单')
    })



    // 已付款
    $($('.s_ul2 li')[2]).click(function(){
        $('.yfk').toggle();
    })
     $('.s_cspan2').click(function(){
        $('.yfk').toggle();
    })
    $('.s_yfkbtn').click(function(){
        alert('订单已确认，货款稍后到账')
    })

    //退货 
    $($('.s_ul3 li')[0]).click(function(){
        $('.th').toggle();
    })
    $('.s_ths').click(function(){
        $('.th').toggle();
    })
    $('.s_thbtn').click(function(){
        alert('退货订单已处理')
    })

    // 问题订单
    $($('.s_ul3 li')[1]).click(function(){
        $('.wtdd').toggle();
    })
    $('.s_ths1').click(function(){
        $('.wtdd').toggle();
    })
    $('.s_wtddbtn').click(function(){
        alert('问题订单已处理，请留意处理结果')
    })

    // 用户评价
    $($('.s_ul3 li')[2]).click(function(){
        $('.yhpj').toggle();
    })
    $('.s_ths2').click(function(){
        $('.yhpj').toggle();
    })

    // 商品上架
    $($('.s_ul4 li')[0]).click(function(){
        $('.spsj').toggle();
    })
    $('.s_spsj').click(function(){
        $('.spsj').toggle();
    })
    // 商品促销
    $($('.s_ul4 li')[1]).click(function(){
        $('.spcx').toggle();
    })
    $('.s_spcx').click(function(){
        $('.spcx').toggle();
    })  
    // 商品下架
    $($('.s_ul4 li')[2]).click(function(){
        $('.spxj').toggle();
    })
    $('.s_spxj').click(function(){
        $('.spxj').toggle();
    }) 
    $('.s_spxjbtn').click(function(){
        if(confirm('确定将该商品下架吗？'))
        {
            $('.s_xj').css({display:'none'})
        }
    })
    // 商品库存
    $($('.s_ul4 li')[3]).click(function(){
        $('.spkc').toggle();
    })
    $('.s_spkc').click(function(){
        $('.spkc').toggle();
    }) 
})