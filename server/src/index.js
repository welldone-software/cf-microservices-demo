const koa = require('koa');
const compress = require('koa-compress');
const logger = require('koa-logger');
const static = require('koa-static');
const cors = require('kcors');
const path = require('path');
const routes = require('./routes');
const port = process.env.PORT || 9000;

const app = koa();

app.use(cors());
app.use(logger());
app.use(routes());
app.use(static(path.join(__dirname, '../client/dist')));
app.use(compress());

app.listen(port);
