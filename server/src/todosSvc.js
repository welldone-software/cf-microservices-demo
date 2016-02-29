const monk = require('monk');
const coMonk = require('co-monk');
const mongoUrl = process.env.MONGO_URL || 'localhost/cf-reactjs-jumpstart';
const debug = require('debug')('api:todosdb');
const parse = require('co-body');
var co = require('co');

const db = monk(mongoUrl);
const todos = coMonk(db.get('todos'));

co(function*(){
  try{
    const count = yield todos.count({});
    if(count === 0){
      debug('Database is empty. Will insert sample data.');
      const todosLists = require('./sampledata.json');
      yield todos.insert(todosLists);
    }
  }
  catch(e){
    debug(e);
    console.error(e)
  }
});


module.exports.all = function*() {
  return yield todos.find({}, ['_id', 'name']);
};

module.exports.get = function*(id) {
  return yield todos.findOne({_id: Number(id)});
};

module.exports.add = function*(todosObj) {
  return yield todos.insert(todosObj);
};

module.exports.update = function*(id, todosObj) {
  if (id !== todosObj._id) {
    throw new Error('Inconsistent id');
  }
  return yield todos.update({_id: todosObj._id}, todosObj);
};

module.exports.remove = function*(id) {
  yield todos.remove({_id: id});
};