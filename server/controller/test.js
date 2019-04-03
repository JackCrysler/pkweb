/*
 * @Description: Socket IO 测试文件
 * @Author: JackSmart
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-01 22:34:27
 * @LastEditTime: 2019-04-03 11:05:44
 */
const fs = require('mz/fs')
const path = require('path')
const root = path.resolve(process.cwd(),'server')
let test = async (ctx,next)=>{

    let tpl = await fs.readFileSync(root+'/view/test.html','utf-8')
    ctx.response.type = 'text/html';
    ctx.response.body=tpl;
}

let addq = async (ctx,next)=>{
    // let data =require('../sql_file/crawler')
    // let {choiceQuestion,sortQestion} = data;
    // for(let item of choiceQuestion){
    //     // console.log(i)
    //     let [qid, title, options, answer] = item;
    //     try{
    //             let res =await ctx.mysql(`insert into questions (qid, title, options, answer, qtype, create_date) values ('${qid}', '${title}','${options}','${answer}','1',localtimestamp())`)
    //         }catch(e){
    //             console.log(e)
    //         }
    // }
    
    ctx.response.body = sortQestion
}
module.exports = {
    "GET /test":test,
    "GET /addQuestion":addq
}