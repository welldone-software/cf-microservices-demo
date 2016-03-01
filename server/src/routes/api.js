const Router = require('koa-router');
const parse = require('co-body');
const todosSvc =  require('../todosSvc');
const config = require('../config');

const router = new Router({
  prefix: '/api'
});

router
  .get('/init', function*(next){
    this.body = {
      auth: {
        baseUrl: config.auth.baseUrl,
        appId: config.auth.appId
      }
    };
  })
  .get('/todos', function*(next) {
    this.body = yield todosSvc.all();
  })
  .get('/todos/:id', function*(next){
    const id = this.params.id;
    this.body = yield todosSvc.get(id);
  })
  .post('/todos', function*(next) {
    const todosObj = yield parse(this);
    this.body = yield todosSvc.add(todosObj);
  })
  .put('/todos/:id', function*(next) {
    const id = Number(this.params.id);
    const todosObj = yield parse(this);
    try {
      this.body = yield todosSvc.update(id, todosObj);
    } catch(err) {
      this.throw(400, err);
    }
  })
  .delete('/todos/:id', function*(next){
    const id = Number(this.params.id);
    yield todosSvc.remove(id);
    this.status = 200;
  });


module.exports = router.routes.bind(router);