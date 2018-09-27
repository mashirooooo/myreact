define(function () {
    return {
            /**
             * [获取cookie]
             * @param  {String} key [cookie名]
             * @return {String}      [返回cookie自]
             */
            get:function(key,num){
                // 先获取所有cookie
                var cookies = document.cookie;
                if(cookies.length === 0){
                    return '';
                }
                var result= [];
                // 拆分每一个cookie
                cookies = cookies.split('; ');

                for(var i=0;i<cookies.length;i++){
                    // 拆分key,value
                    var arr = cookies[i].split('=');

                    if (num > 1) {
                        if(arr[0].indexOf(key) != -1){
                            result.push([arr[0],arr[1]]);
                        }
                    }else{
                        if(key === arr[0]){
                            return arr[1];
                        }
                    };
                }
                return result;
            },

            /**
             * [设置/修改cookie]
             * @param {String} key   [cookie名]
             * @param {String} value [cookie值]
             * @param {[Date]} date  [有效期，必须为Date类型]
             * @param {[String]} path  [cookie保存路径]
             */
            set:function(key,value,date,path){
                var str = key + '=' + value;

                // 有效期
                if(date){
                    str += ';expires=' + date.toUTCString();
                }

                // 路径
                if(path){
                    str += ';path='+path;
                }

                document.cookie = str;
            },

            /**
             * [删除cookie]
             * @param  {String} key [cookie名]
             * @param {[String]} path     [cookie保存的路径]
             */
            remove:function(key,path){
                var d = new Date();
                d.setDate(d.getDate()-1);

                // document.cookie = key + '=x;expires=' + d.toUTCString();
                this.set(key,'x',d,path);
            },

            // 清空cookie
            clear:function(){

            }
        }
})