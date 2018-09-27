require(['config'],function(){
    require(['jquery','magnify','http','cookie','top'],function($,magnify,http,cookie,top){
        $(function($){
            // 参数获取
            var url = window.location.search;
            var param={};
            // 拆分URL
            if(url.indexOf("?")!=-1){
                var _res = url.substr(1)　
                _url = _res.split("&");
                for(var i=0;i<_url.length;i++){
                    param[_url[i].split("=")[0]]=decodeURI(_url[i].split("=")[1])
                }
            }

            http.post('http://localhost:8080/goodlist',param).then((res) =>{
                if (res.status) {
                    data = res.data[0][0];
                    var site =`
                    <code> > </code>
                    <a href="javascript:void">${data.Species}</a>
                    <code> > </code>
                    <a href="javascript:void">${data.name}</a>
                    <code> > </code>
                    <span>${data.title}</span>`
                    $(site).appendTo('#site');

                    var smallimg = '';
                    for(var i =0 ;i < 5;i++){
                        if (i == 0) {
                            smallimg += `<li class="first"><img src="${data.imgUrl.split('///')[i]}" alt="" /></li>`
                            var smallimgs = `<img src="${data.imgUrl.split('///')[i]}" alt="" />`
                            $(smallimgs).appendTo('.smallimg')
                        }else{
                            smallimg += `<li><img src="${data.imgUrl.split('///')[i]}" alt="" /></li>`
                        };
                    }
                    $(smallimg).appendTo('#maindetail .fl ul')


                    var body =`            <div class="fr">
                    <h2 class="h2">
                    <div style="color:#b20000; font-size:16px; font-family:'微软雅黑'"></div>${data.title}  </h2>
                    <form action="#" method="post" id="buy_haicha_form">
                        <div class="top">
                        <span class="no">产品编号：<span>${data.id}</span></span>
                            <ul class="ul">
                                <li>
                                    <label class="label">市 场 价：</label><del>￥${data.oldPrice}</del> ( 为您节省<span class="discount">￥${data.oldPrice-data.newPrice}</span>)</li>
                                <li>
                                    <label class="label">嗨 茶 价：</label><span class="pricespan">￥${data.newPrice}</span><span style="margin-left:10px;"><a href="javascript:;" class="jiangjia_tongzhi" style="text-decoration:none; color:#005AA0">(降价通知)</a></span><span class="mobile_price"><label>手机专享价</label>¥${data.mbPrice} </span>

                                </li>
                                <li>
                                    <label class="label">运 费：</label>全场满¥59,免运费(不含货到付款)</li>
                                <li>
                                    <label class="label">已 销 售：</label><span class="num" id="goods_sale_num">${data.sale}</span>件</li>
                                <li>
                                    <label class="label">评 论：</label><span class="xin"><span class="xins" style=" width:80px;"></span></span><span class="span">已有( <a href="#product_detail" id="goto_comment">${data.commentNum}</a> )人评价</span>

                                </li>
                            </ul>
                        </div>
                        <div class="bottom">
                            <ul>
                                <li class="li1">
                                    <label class="label">包 装：</label>   <span class="s_list" id="packagelist">
                                    <label class="current"> <img src="${data.imgUrl.split('///')[0]}" alt="${data.title}" title="${data.title}" width="60" height="60" original="${data.imgUrl.split('///')[0]}"><span></span>

                                    </label>
                                    </span>
                                </li>
                                <li class="li2">
                                    <label class="label">克 数：</label>   <span class="g_list" id="grampacks">
                                    <a class="current" href="javascript:void(null)">${data.weight}<span></span></a>
                                    </span>
                                </li>
                                <li class="li3">
                                    <label class="label">购买数量：</label>
                                    <input type="button" class="btn1 disabled" id="peductionbtn">
                                    <input type="text" class="text" value="1" id="buytxt" name="buytxt" maxlength="6">
                                    <input id="additionbtn" type="button" class="btn2"> <span class="notice" id="buy_num_notice" style="display:none"></span>   
                                </li>
                                <li class="li4">
                                    <input type="button" class="buybtn">
                                    <input type="button" class="collectbtn">
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>`
                $(body).appendTo('#maindetail .fr')

                
                var _productintro = '';
                productintroarr = data.detailImg.split('///');
                for (var i = 0;i <productintroarr.length; i++){
                    _productintro += `<img src="${productintroarr[i]}" original="${productintroarr[i]}">` 
                };

                $(_productintro).appendTo('.fl .productintro')


                    //放大
                    $('#maindetail .fl ul li img').mouseenter(function(event) {
                        $('#maindetail .smallimg img').prop({"src":$(this).prop("src")})
                        $('#maindetail .fl ul li').prop({"class":""});
                        $(this).parent('li').prop({"class":"first"});

                    });
                    magnify.initialize($('.smallimg'));
                    // 鼠标进入
                    $('.smallimg').mouseenter(function(e) {
                        e=e.target
                        if(!e.src){
                            // 鼠标在父对象边框进入的情况
                            // src将获取不到
                            e=$('img',e)[0] 
                        }
                            magnify.into(e.src)
                    });
                    // 鼠标离开
                    $('.smallimg').mouseleave(function(e) {
                        magnify.leave()
                    });
                    // 鼠标移动
                    $('.smallimg').mousemove(function(e) {
                        magnify.mover(e)
                    });
                    $('#peductionbtn').click(function(){
                        if ($('.li3 .text').val().trim() <=2) {
                            $('.li3 .text').val(1);
                            $(this).prop({"class":"btn1 disabled"})
                            return false;
                        };
                        $('.li3 .text').val($('.li3 .text').val().trim()-1)
                    })
                    $('#additionbtn').click(function(){
                        $('#peductionbtn').prop({"class":"btn1"});
                        $('.li3 .text').val($('.li3 .text').val().trim()*1+1)
                    })
                    $('.li3 .text')[0].oninput = () =>{
                        if ($('.li3 .text').val().trim()*1 <= 1) {
                            $('.li3 .text').val(1)
                        }else{
                            $('.li3 .text').val(parseInt($('.li3 .text').val().trim()))
                        };
                    }
                    $('#maincontent #maindetail .fr form .bottom .buybtn').click(function(e){
                        var d = new Date();
                        d.setDate(d.getDate()+7);
                        var text = $('.top .no span').text().trim();
                        var result = cookie.get(text,0);
                        if (res.data[0][0].detailImg) {
                            delete res.data[0][0].detailImg;
                        };
                        if (result.length>3) {
                            res.data[0][0].num = $('#maincontent #maindetail .fr form .bottom .text').val()*1+JSON.parse(result).num*1;
                            cookie.set(text,JSON.stringify(res.data[0][0]),d)
                        }else{
                            res.data[0][0].num = $('#maincontent #maindetail .fr form .bottom .text').val();
                            cookie.set(text,JSON.stringify(res.data[0][0]),d)
                        };
                    })
                };
            })
        })
    })    
})