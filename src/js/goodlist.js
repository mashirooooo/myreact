require(['config'],function(){
    require(['jquery',"http",'top','cookie'],function($,http,top,cookie){
        function creatEle(arr,obj){
            for( var i = 0; i < arr.length ;i++){
                    var   brr= `<span class="linkspan">
                                <a href="javascript:void">${arr[i]}</a>
                                </span>`
                    $(brr).appendTo(obj);
            }
        };
        // 参数获取
        var url = window.location.search;
        var param={};

        function gointoPage(){
            var href = window.location.origin+window.location.pathname+'?';
            queryarr = [];
            for(var key in param){
                queryarr.push(''+key+'='+param[key])
            }
            window.location.href = href+encodeURI(queryarr.join('&'))
        }
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
                //品牌Brand 季节Season 包装 Pack
                let Brand = res.data[1][0],season = res.data[1][1],pack = res.data[1][2];

                creatEle(Brand,$('.Brand '));
                creatEle(season,$('.season '));
                creatEle(pack,$('.pack '));


                var data = res.data[0];
                //导航title
                var titles = `<label class="label">共
                    <b>${res.data[2]}</b>件相关商品
                </label>
                <a href="javascript:void">首页</a>
                <code>></code>
                <a href="javascript:void">${data[0].Species}</a>`
      
                if (param.name) {
                   titles +=  `<code>></code>
                    <a href="javascript:void">${data[0].name}</a>`
                };
                if (param.Brand) {
                   titles +=  `<code>></code>
                    <a href="javascript:void">${data[0].Brand}</a>`
                };
                $(titles).appendTo('#searchcondition .title');


                //生成按钮
                var page = `
                    <a href="javascript:void" class="prev">上一页</a>
                    `
                    for(var i = 0; i < Math.ceil(res.data[2]/50);i++){
                        if (i == param.num) {
                            page +=`<a href="javascript:void" class="current">${i+1}</a>`
                        }else{
                            page +=`<a href="javascript:void">${i+1}</a>`
                        };
                         
                    };

                    page += `<a href="javascript:;"
                                class="next">下一页</a>
                            <span>共${Math.ceil(res.data[2]/50)}页 </span>到
                                <input type="text" class="text" id="page_box">
                                <input type="button" class="btn" value="">`
                $(page).appendTo('.page');


                $('.page a').click(function(e){
                    if ($(this).prop("class") == 'current') {
                        return false;
                    };
                    if ($(this).prop("class")== 'next') {
                        param.num ++;
                        if (param.num > $('.page a').length - 3) {
                            param.num = param.num*1-1;
                            return false;
                        };
                       gointoPage();
                    };
                    if ($(this).prop("class") == 'prev') {
                        param.num--;
                        if (param.num < 0) {
                            param.num = param.num*1+1;
                            return false;
                        };
                        gointoPage();
                    };
                    param.num = $(this).text()*1-1;
                    gointoPage();
                })
                $('.page .btn').click(function(e){
                    var text = parseInt($('.page #page_box').val()*1);
                    if (text> 0 && text <= $('.page a').length - 2) {
                        param.num = text - 1;
                        gointoPage();
                    };
                })
                $('.linkspan a').click(function(e){
                    if ($(this).parents('.item').prop("class").indexOf('season') > 0) {
                        param.season = $(this).text();
                        param.num = 0;
                        gointoPage();
                    };
                    if ($(this).parents('.item').prop("class").indexOf('Brand') > 0) {
                        param.num = 0;
                        param.Brand = $(this).text();
                        gointoPage();
                    };
                    if ($(this).parents('.item').prop("class").indexOf('pack') > 0) {
                        param.num = 0;
                        param.pack = $(this).text();
                        gointoPage();
                    };
                })



                for(var i = 0 ;i<data.length;i++){
                    var _data = `
                    <li id="${data[i].id}">
                        <div class="inner">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="img">
                                <a href="javascript:void" title="${data[i].title}">
                                    <img src="${data[i].imgUrl.split('///')[0]}" alt="${data[i].title}" title="${data[i].title}">
                                </a>
                            </div>
                            <h5><a href="javascript:void" title="${data[i].title}">${data[i].title}</a></h5>
                            <div class="label"></div>
                            <div class="price"><a  href="javascript:void" class="comment">${data[i].commentNum}条评论</a><span>￥${data[i].newPrice}</span><del>￥${data[i].oldPrice}</del>
                            </div>
                            <div class="discount"><span>销量：${data[i].sale}</span>直降￥${data[i].oldPrice-data[i].newPrice}</div>
                            <div class="activity" style="height:19px;">
                                <img src="img/compare_discount010.png" original="img/compare_discount010.png" style="display: inline;">
                            </div>
                            <div class="control">
                                <input type="button" class="comparebtn" >
                                <input type="button" class="collectbtn">
                                <input type="button" class="addtocarts" value="">  
                            </div>
                            <div class="pic_word"></div>
                        </div>
                    </li>
                    `
                    $(_data).appendTo('#searchbody .list')
                }
                $('#searchbody .list .img a').click(function(e){
                    console.log("x")
                    var id = $(this).parents('.inner').parent().prop("id")
                    window.location.href = window.location.origin+`/detail.html?id=${id}`
                })
                $('#searchbody .list h5 a').click(function(e){
                    var id = $(this).parents('.inner').parent().prop("id")
                    window.location.href = window.location.origin+`/detail.html?id=${id}`
                })
                $('#maincontent #searchbody .list .inner .addtocarts').click(function(){
                    var d = new Date();
                    d.setDate(d.getDate()+7);
                    var idx = $(this).parents('li').index();
                    var text = $(this).parents('li').prop("id");
                    var result = cookie.get(text,0);
                    if (res.data[0][idx].detailImg) {
                        delete res.data[0][idx].detailImg;
                    };
                    if (result.length>3) {
                        res.data[0][idx].num = JSON.parse(result).num*1 + 1;
                        cookie.set(text,JSON.stringify(res.data[0][idx]),d)
                    }else{
                        res.data[0][idx].num = 1;
                        cookie.set(text,JSON.stringify(res.data[0][idx]),d)
                    };
                })
            }
        })
    })   
})