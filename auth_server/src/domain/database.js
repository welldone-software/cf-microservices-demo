const monk = require('monk');
const coMonk = require('co-monk');
const mongoUrl = process.env.MONGO_URL || 'localhost/cf-reactjs-jumpstart';
const debug = require('debug')('auth:database');
var co = require('co');

const db = monk(mongoUrl);
const apps = coMonk(db.get('apps'));

co(function*(){
	try{
		const count = yield apps.count({});
		if(count === 0){
			debug('Database is empty. Will insert sample data.');
			const data = require('./sampledata.js');
			yield apps.insert(data);
		}
	}
	catch(e){
		debug(e);
		console.error(e)
	}
});


module.exports = {apps};
