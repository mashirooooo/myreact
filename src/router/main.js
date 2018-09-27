const db = require('../db/dbhelper.js');
const apiResult = require('../utils/apiResult.js');


module.exports= {
    register: (app) => {
        app.post('/main', async (req, res) => {
            try{
                let result = await db.mongodb.select('y_goodslist', {});
                if(result.length > 0) {
                    res.send(result);
                } else {
                    res.send(apiResult(false));
                }         
            } catch(error){
                res.send(apiResult(false, error));
            }
        })
    }
}
