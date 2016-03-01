const Router = require('koa-router');
const suspiciousSvc = require('../suspiciousSvc');

const router = new Router({

});


router
  .get('/suspicious', function*(){
    this.body =  yield suspiciousSvc();
    this.type = 'html';
  });

module.exports = router.routes.bind(router);