require(['config'],function(){
    require(['jquery','magnify','http','cookie','top'],function($,magnify,http,cookie,tt){
            var result = cookie.get('Hicha',3);
            if (!result) {
                return false;
            };
            // console.log(result)
            result.map(function(i){
                var dataObj = JSON.parse(i[1]);
                var _cardetail = `
                <li class="s_goodsli" id = "${dataObj.id}">

                <input type="checkbox" class="checkbox">
                <div class="s_goodsimg">
                     <img src = "${dataObj.imgUrl.split('///')[0]}" width = "70"/>
                </div>
                <span class="s_tit">
                     ${dataObj.title}       
                </span>
                 <span class="s_price">
                       ￥${ dataObj.newPrice}
                 </span>
                 <span class="s_num">
                     <button class="butDown" style="width:25px;height:18px ;text-align: center;"> - </button><input type="text" value="${dataObj.num}" class="num1"><button class="butUp" style="width:25px;height:18px ;text-align: center;"> + </button>
                 </span>
                 <span class="s_point">
                       ${(dataObj.newPrice*dataObj.num*0.1).toFixed(1)}          
                 </span>
                 <span class="s_dleprice">
                       ￥${ dataObj.oldPrice - dataObj.newPrice}/件
                 </span>
                 <span class="s_total">
                       ￥${ dataObj.newPrice*dataObj.num}
                 </span>
                 <div class="s_control">
                     <div class="s_btn">
                         <a href="javascript:void(null)">删除</a>
                     </div>
                 </div>
               </li>
                 `
                $(_cardetail).appendTo('.s_cartUl');

                        })
                    function summary(){
                        var sum = 0;
                        var arr = $('.s_mycart .s_inner .s_goodsli .s_total');
                        arr.each(function(i,e){
                            sum += $(e).text().trim().slice(1)*1;
                        })
                        $('.s_mycart .form span').text('总价：'+sum)
                    }
                    summary();
                    $('.s_num button').click(function(){   
                        var res = $(this).parent().children('.num1').val()*1;  
                        if ($(this)[0].className == 'butDown') {
                             res--;
                             if(res <= 1){
                                 res = 1;
                             }
                        }else if($(this)[0].className == 'butUp'){
                             res++;
                        };   
                        $(this).parent().children('.num1').val(res);
                        $(this).parent().nextAll('.s_total').text('￥'+(res*$(this).parent().prevAll('.s_price').text().trim().slice(1)*1));
                        
                        $(this).parent().nextAll('.s_point').text(($(this).parent().nextAll('.s_total').text().slice(1)*0.1).toFixed(1));
                        summary();
                    })
                    $('.s_control .s_btn a').click(function(e){
                        var _id = $(this).parents('li.s_goodsli').prop("id");
                        cookie.remove(_id.trim(),'/')
                        $(this).parents('li.s_goodsli').remove();
                        summary();
                    })
    })
    
})









