const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const routerConfig = require('./router')
const mysql = require('./mysql')
const bodyParser = require('koa-bodyparser')
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
const socket = require('./socket')
const port = 8001
const fs = require('fs')
const privatekey = fs.readFileSync(process.cwd()+'/server/private.key','utf-8')
app.context.privatekey=privatekey

//配置bodyparser
app.use(bodyParser())
//配置mysql
mysql(app)
//配置路由
app.use(routerConfig(router))
//配置io
socket(app,io)

server.listen(port, ()=>{
    console.log(`server started at port ${port}`)
})