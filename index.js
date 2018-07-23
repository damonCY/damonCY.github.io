const Koa = require('koa')
const path = require('path')
const app = new Koa()
const serve = require('koa-static')

app.use(serve(__dirname + '/static'))
app.listen(5000, () => {
    console.log('server start')
})