const path = require('path');
const koa = require('koa');
const static = require('koa-static');
const logger = require('koa-logger');
const PORT = process.env.PORT || 8000;
const routes = require('./routes');

const app = koa();

app.use(logger());
app.use(routes());
app.use(static(path.join(__dirname, '../public')));
app.listen(PORT);

console.log(`Server is Running on port ${PORT}`);