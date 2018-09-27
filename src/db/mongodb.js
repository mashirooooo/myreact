const mongodb = require('mongodb');
const mc = mongodb.MongoClient;
var db;
(async () => {
	try {
		await new Promise((res, rej) => {
			mc.connect('mongodb://127.0.0.1:27017', {
				useNewUrlParser: true
			}, (_error, _db) => {
				if (_error) {
					rej(_error);
				};
				db = _db.db('hc');
				res(_db);
			});
		});

	} catch (err) {
		console.log(err);
	}
})();

module.exports = {
	select(_collection, _condition = {}) {
		return new Promise((resolve, reject) => {
			db.collection(_collection).find(_condition).toArray().then((result) => {
				resolve(result)
			}).catch((error) => {
				reject(error);
			})
		})
	},
	insert(_collection, _data) {
		return new Promise((resolve, reject) => {
			db.collection(_collection).insert(_data).then((result) => {
				resolve(result)
			}).catch((error) => {
				reject(error);
			})
		})
	},
	update(_collection, _condition, _data) {
		return new Promise((resolve, reject) => {
			db.collection(_collection).update(_condition, _data).then((res) => {
				resolve(res)
			}).catch((error) => {
				reject(error)
			})
		})
	},
	limitSelect(_collection, _condition = {}, start) {
		return new Promise(async (resolve, reject) => {
			function unique(array) {
				array.sort();
				var re = [array[0]];
				for (var i = 1; i < array.length; i++) {
					if (array[i] !== re[re.length - 1]) {
						re.push(array[i]);
					}
				}
				return re;
			}
			db.collection(_collection).find(_condition).toArray().then((result) => {
				let num = result.length;
				let Brand = [],
					season = [],
					pack = [];
				for (var i = 0; i < result.length; i++) {
					Brand.push(result[i].Brand);
					season.push(result[i].season);
					pack.push(result[i].pack);

				}
				let leg = new Array(unique(Brand), unique(season), unique(pack))
				result = new Array(result.slice(start, start + 50), leg, num);
				resolve(result)
			}).catch((error) => {
				reject(error);
			})
		})
	},
	delete() {}
}