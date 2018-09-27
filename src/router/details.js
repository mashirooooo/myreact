const db = require('../db/dbhelper.js');
const apiResult = require('../utils/apiResult.js');


module.exports = {
    register: (app) => {
        app.post('/details', async (req, res) => {
            let data = {
                qty: 10,
                pageNo: 2
            }
            try{
                let result = await db.mongodb.select('prodata', {});
                if(result.length > 0) {
                    // result = result.slice((data.pageNo-1)*(data.qty),(data.qty));
                    result=result.sort(function(a,b){
                        return a.price.slice(1)-b.price.slice(1);
                    })
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
