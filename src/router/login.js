const db = require('../db/dbhelper.js')
const apiResult = require('../utils/apiResult.js')
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;

module.exports = {
    register: (app) => {
        app.post('/login', async (req, res) => {
            let data = {
                name: req.body.username,
                password: req.body.password
            }
            try{
                let result = await db.mongodb.select('users', data);
                let secret = 'token';
                let token;
                if(result.length > 0) {
                    let token = jwt.sign({name: req.body.username}, secret, {
                        'expiresIn': 60*60*24 // 设置过期时间, 24 小时
                    }) 
                    res.send(apiResult(result.length > 0, token));
                } else {
                    res.send(apiResult(false));
                }         
            } catch(error){
                console.log(error)
                res.send(apiResult(false, error));
            }
        })
    }
}