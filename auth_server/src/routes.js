const Router = require('koa-router');
const router = new Router();
const domain = require('./domain');
const path = require('path');
const fs =require('fs')
const db = require('./domain/database');
const jwt = require('koa-jwt');

router.get('/cf-auth.js', function*(next){

  const fileContent  = fs.readFileSync(path.normalize( `${__dirname}/../templates/cf-auth.js`));
  this.body = fileContent.toString().replace('__AUTH_BASE_URL__', 'http://localhost:8000');
  this.type = 'text/javascript';
});

router.get('/:appId/login', function*(next) {
  const githubUrl = domain.getProviderRemoteLoginUrl('http://localhost:8000', this.params.appId, 'github');
  const fileContent  = fs.readFileSync(path.normalize( `${__dirname}/../templates/login.html`)).toString().replace('__appId__', this.params.appId);
  this.body = fileContent.toString().replace('__githubUrl__', githubUrl);
});

router.get('/:appId/authenticate', function*(next) {
  const email = this.query.email;
  console.log(email)
  const appId = this.params.appId;
  const privateKey = (yield db.apps.findOne({clientId : appId})).privateKey;

  const scriptTemplate = (message) => `<script>window.opener.postMessage('${message}', '*'); window.close();</script>`;
  const token = jwt.sign({  email: email }, privateKey, {
    iss: 'user',
    expiresIn: '2 days'
  });

  this.body = scriptTemplate(JSON.stringify({jwt: `${token}`, message: '', success: true}));
  this.type = 'html';
});

router.get('/:appId/callback/:provdier', function*(next) {
  const appId = this.params.appId;
  const provider = this.params.provdier;
  const code = this.request.query['code'];

  const scriptTemplate = (message) => `<script>window.opener.postMessage('${message}', '*'); window.close();</script>`;
  try {
    const jwt = yield domain.handleProviderCallback(appId, provider, this.request.querystring);
    this.body = scriptTemplate(JSON.stringify({jwt: `${jwt}`, message: '', success: true}));
  } catch (err) {
    this.body = scriptTemplate(JSON.stringify({jwt: '', message: err.message, success: false}));
  }
  this.type = 'html';
});

module.exports = router.routes.bind(router);