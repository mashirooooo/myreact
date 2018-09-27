const db = require('../db/dbhelper.js')
const apiResult = require('../utils/apiResult.js')

module.exports = {
    register: (app) => {
        app.post('/register', async (req, res) => {
            let data = {
                username: req.body.username,
                password: req.body.password
            }
            let dataset = await db.mongodb.select('users', {username: req.body.username});
            if(dataset.length > 0){
                res.send(apiResult(false, null, 'users exists'));
            } else {
                let result = await db.mongodb.insert('users', data);
                res.send(apiResult(true));
            }
        })
    }
}