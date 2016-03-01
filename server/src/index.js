const koa = require('koa');
const compress = require('koa-compress');
const logger = require('koa-logger');
const static = require('koa-static');
const cors = require('kcors');
const path = require('path');
const api = require('./routes/api');
const pages = require('./routes/pages');
const port = require('./config').port;

const app = koa();

app.use(cors());
app.use(logger());
app.use(api());
app.use(pages());
app.use(static(path.join(__dirname, '../../client/dist')));
app.use(compress());

app.listen(port);
