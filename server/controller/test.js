/*
 * @Description: Socket IO 测试文件
 * @Author: JackSmart
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-01 22:34:27
 * @LastEditTime: 2019-04-02 17:48:06
 */
const fs = require('mz/fs')
const path = require('path')
const root = path.resolve(process.cwd(),'server')
let test = async (ctx,next)=>{

    let tpl = await fs.readFileSync(root+'/view/test.html','utf-8')
    ctx.response.type = 'text/html';
    ctx.response.body=tpl;
}


module.exports = {
    "GET /test":test
}