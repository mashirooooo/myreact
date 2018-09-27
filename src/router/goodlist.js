const db = require('../db/dbhelper.js')
const apiResult = require('../utils/apiResult.js')


module.exports = {
    register: (app) => {
        app.post('/goodlist',async (req,res) =>{
            let num = req.body.num*1 || 0;
            let data={};
            if (req.body.name) {
                data.name = req.body.name;
            };
            if (req.body.id) {
                data.id = req.body.id;
            };
            if (req.body.Species) {
                data.Species = req.body.Species;
            };
            if (req.body.season) {
                 data.season = req.body.season;
            };
            if (req.body.Brand) {
                data.Brand = req.body.Brand;
            };
            try{
                let result = await db.mongodb.limitSelect('prodata',data,num*50);
                if (result.length > 0) {
                    res.send(apiResult(result.length > 0, result))
                };
            }catch(err){
                res.send(apiResult(false, err));
            }
        })
    }
}