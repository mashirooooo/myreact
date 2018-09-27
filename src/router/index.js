const express = require('express')
const bparser = require('body-parser')
const path = require('path')
const jwt = require('jsonwebtoken');
const url = require('url')
const apiResult = require('../utils/apiResult.js')

const app = express();
app.use(express.static(path.join(__dirname, '../')));
app.use(bparser.urlencoded({extended: false}))

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,auth");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});



const filterList = ['/login','/main','/register','/details','/home','/goodlist'];

app.use((req, res, next) => {
    let pathname = url.parse(req.url, true).pathname;
    if(filterList.includes(pathname)){
        next();
    } else {
        let token = req.headers['auth'];
        if(!token){
            res.send(apiResult(false, null, 'Token empty!'));
        } else {
            jwt.verify(token, 'token', async (err, result) => {
                if(err){
                    res.send(apiResult(false, error));
                } else {
                    next();
                }
            })
        }
    }
})

const login = require('./login.js');
const register = require('./register.js');
const main = require('./main.js');
const goodlist = require('./goodlist.js');

module.exports = {
    start: (_port) => {
        login.register(app);
        main.register(app);
        register.register(app);
        goodlist.register(app);
        app.listen(_port || 8080);
    }
}