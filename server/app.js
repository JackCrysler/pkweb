const Koa = require('koa')
const app = new Koa()
const path = require('path')
const Router = require('koa-router')
const router = new Router()
const routerConfig = require('./router')
const upload = require('./router/upload')
const mysqlCfg = require('./mysql')
const bodyParser = require('koa-bodyparser')
const staticServe = require('koa-static');
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
const socket = require('./socket')
const port = 8001
const fs = require('fs')
const privatekey = fs.readFileSync(process.cwd()+'/server/private.key','utf-8')
const publicPath = path.resolve(__dirname,'../public/')

app.context.privatekey=privatekey

//配置bodyparser
app.use(bodyParser())
//配置静态资源服务器
app.use(staticServe(publicPath))
//配置mysql
mysqlCfg.setMysqlWithKoa(app)
//文件上传, 定义在路由上
upload(router)
//配置路由
app.use(routerConfig(router))
//配置io
socket(app,io)

server.listen(port, ()=>{
    console.log(`server started at port ${port}`)
})