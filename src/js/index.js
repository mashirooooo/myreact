require(['config'],function(){
    require(['jquery','http','gscarousel'],function($,http,ca){
        $(function($){
            //轮播图
            $('#banner').gsCarousel({
                imgs:['img/y_banner_1.jpg','img/y_banner_2.jpg','img/y_banner_3.jpg','img/y_banner_4.jpg']
            }).show();


            //特价倒计时
            for(let i=0;i<4;i++){
                $('<li/>').appendTo('#indextuan ul')
            }
            showTime();
            var timer = setInterval(showTime,1000);
            function showTime(){
                var countDown = document.querySelector('.Countdown');
                var target = '2018-08-01 00:00:00';
                var offset = Date.parse(target) - Date.now();
                offset = parseInt(offset/1000);
                if(offset<=0){
                    clearInterval(timer);
                    $('#indextuan li')[0].innerText=0;
                    $('#indextuan li')[1].innerText=0;
                    $('#indextuan li')[2].innerText=0;
                    $('#indextuan li')[3].innerText=0;
                }
                var day = parseInt(offset/60/60/24);
                var hours = parseInt(offset/60/60)%24;
                var minutes = parseInt(offset/60)%60;
                var seconds = parseInt(offset)%60;
                hours = hours < 10 ? '0'+hours : hours;
                minutes = minutes < 10 ? '0'+minutes : minutes;
                seconds = seconds < 10? '0'+seconds : seconds;
                $('#indextuan li')[0].innerText=day;
                $('#indextuan li')[1].innerText=hours;
                $('#indextuan li')[2].innerText=minutes;
                $('#indextuan li')[3].innerText=seconds;
            }

            //图片放大效果
            $('.img img').hover(function(){
                $(this).css({width:'228px',height:'210px',transition:'all 0.5s linear',marginTop:'-5px',marginLeft:'-5px'})
            },function(){
                $(this).css({width:'218px',height:'200px',marginTop:'0px',marginLeft:'0px'})
            });
            $('.img1 img').hover(function(){
                $(this).css({width:'200px',height:'185px',transition:'all 0.5s linear',marginTop:'-5px',marginLeft:'-5px'})
            },function(){
                $(this).css({width:'190px',height:'175px',marginTop:'0px',marginLeft:'0px'})
            });



            //tab切换
            for(let i=0;i<$('.tabss li').length;i++){
                $('.tabss li')[i].onmouseover=function(){
                    for(let j=0;j<$('.bodycontent ul').length;j++){
                        if(i==j){
                            $('.tabss li')[i].className='active';
                            $('.bodycontent ul')[i].style.display='block';
                        }else{
                            $('.tabss li')[j].className='';
                            $('.bodycontent ul')[j].style.display='none';
                        }
                    }
                }
            }
            

            http.post('http://localhost:8080/main',{}).then(function(data){
                var data1 = data.slice(0,5);
                $('.rcontnet1 .list')[0].innerHTML = data1.map(function(item){
                    return `<li>
                        <div class="img2">
                            <a href="prolist.html?Species=乌龙茶"><img src="${item.imgurl}" /></a>
                        </div>
                        <h4><a href="prolist.html?Species=乌龙茶">${item.describe}</a></h4>
                        <div class="price">
                            <span>${item.price}</span><del>${item.cost}</del>
                        </div>
                    </li>`;
                }).join('');
                $('.rcontnet1 li')[4].className='li2';
                
                var data2 = data.slice(5,10);
                $('.rcontnet2 .list')[0].innerHTML = data2.map(function(item){
                    return `<li>
                        <div class="img2">
                            <a href="prolist.html?Species=红茶"><img src="${item.imgurl}" /></a>
                        </div>
                        <h4><a href="prolist.html?Species=红茶">${item.describe}</a></h4>
                        <div class="price">
                            <span>${item.price}</span><del>${item.cost}</del>
                        </div>
                    </li>`;
                }).join('');
                $('.rcontnet2 li')[4].className='li2';

                var data3 = data.slice(10,15);
                $('.rcontnet3 .list')[0].innerHTML = data3.map(function(item){
                    return `<li>
                        <div class="img2">
                            <a href="prolist.html?Species=绿茶"><img src="${item.imgurl}" /></a>
                        </div>
                        <h4><a href="prolist.html?Species=绿茶">${item.describe}</a></h4>
                        <div class="price">
                            <span>${item.price}</span><del>${item.cost}</del>
                        </div>
                    </li>`;
                }).join('');
                $('.rcontnet3 li')[4].className='li2';

                var data4 = data.slice(15,20);
                $('.rcontnet4 .list')[0].innerHTML = data4.map(function(item){
                    return `<li>
                        <div class="img2">
                            <a href="prolist.html?Species=花草茶"><img src="${item.imgurl}" /></a>
                        </div>
                        <h4><a href="prolist.html?Species=花草茶">${item.describe}</a></h4>
                        <div class="price">
                            <span>${item.price}</span><del>${item.cost}</del>
                        </div>
                    </li>`;
                }).join('');
                $('.rcontnet4 li')[4].className='li2';

                var data5 = data.slice(20,25);
                $('.rcontnet5 .list')[0].innerHTML = data5.map(function(item){
                    return `<li>
                        <div class="img2">
                            <a href="prolist.html?Species=普洱茶"><img src="${item.imgurl}" /></a>
                        </div>
                        <h4><a href="prolist.html?Species=普洱茶">${item.describe}</a></h4>
                        <div class="price">
                            <span>${item.price}</span><del>${item.cost}</del>
                        </div>
                    </li>`;
                }).join('');
                $('.rcontnet5 li')[4].className='li2';

                var data6 = data.slice(25,30);
                $('.rcontnet6 .list')[0].innerHTML = data6.map(function(item){
                    return `<li>
                        <div class="img2">
                            <a href="prolist.html?Species=白茶"><img src="${item.imgurl}" /></a>
                        </div>
                        <h4><a href="prolist.html?Species=白茶">${item.describe}</a></h4>
                        <div class="price">
                            <span>${item.price}</span><del>${item.cost}</del>
                        </div>
                    </li>`;
                }).join('');
                $('.rcontnet6 li')[4].className='li2';

                var data7 = data.slice(30,35);
                $('.rcontnet7 .list')[0].innerHTML = data7.map(function(item){
                    return `<li>
                        <div class="img2">
                            <a href="prolist.html?Species=茶具"><img src="${item.imgurl}" /></a>
                        </div>
                        <h4><a href="prolist.html?Species=茶具">${item.describe}</a></h4>
                        <div class="price">
                            <span>${item.price}</span><del>${item.cost}</del>
                        </div>
                    </li>`;
                }).join('');
                $('.rcontnet7 li')[4].className='li2';

                var data8 = data.slice(35,40);
                $('.rcontnet8 .list')[0].innerHTML = data8.map(function(item){
                    return `<li>
                        <div class="img2">
                            <a href="prolist.html?Species=茶食品"><img src="${item.imgurl}" /></a>
                        </div>
                        <h4><a href="prolist.html?Species=茶食品">${item.describe}</a></h4>
                        <div class="price">
                            <span>${item.price}</span><del>${item.cost}</del>
                        </div>
                    </li>`;
                }).join('');
                $('.rcontnet8 li')[4].className='li2';

                $('.img2 img').hover(function(){
                    $(this).css({width:'210px',height:'210px',transition:'all 0.5s linear',marginTop:'-5px',marginLeft:'-5px'})
                },function(){
                    $(this).css({width:'200px',height:'200px',marginTop:'0px',marginLeft:'0px'})
                });
                $('.li2 img').hover(function(){
                    $(this).css({width:'146px',height:'146px',transition:'all 0.5s linear',marginTop:'-5px',marginLeft:'-5px'})
                },function(){
                    $(this).css({width:'136px',height:'136px',marginTop:'0px',marginLeft:'0px'})
                });
            });
        })
    })
})