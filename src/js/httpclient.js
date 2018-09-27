define(['jquery'], function($){
    var baseUrl = "http://localhost:8080";
    function filterUrl(_url){
        if(_url.startsWith('http')){
            return _url;
        }  
        return baseUrl + _url;
    }

    return {
        get: function(_url, _data){
            return new Promise(function(resolve, reject){
                $.ajax({
                    url: filterUrl(_url),
                    // url: _url,
                    data: _data || {},
                    headers: {"auth": window.localStorage.getItem('token')},
                    success: function(res){
                        resolve(res)
                    },
                    error: function(error){
                        reject(error)
                    }
                })
            })
        },
        post: function(_url, _data){
            return new Promise(function(resolve, reject){
                $.ajax({
                    url: filterUrl(_url),
                    // rl: _url,
                    data: _data || {},
                    type: 'post',
                    headers: {"auth": window.localStorage.getItem('token')},
                    success: function(res){
                        resolve(res)
                    },
                    error: function(error){
                        reject(error)
                    }
                })
            })
        },
    }
})