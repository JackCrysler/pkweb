const utils = require('../utils/utils')
const {hpe} = utils;
/**
 * @description: 单次添加题目
 * @method POST
 * @param qid {string-number}, title {string}, options {string}, answer {string}
 * @return: 
 */
let addq = async (ctx,next)=>{
    let [qid, title, options, answer] = ctx.repuest.body;
    if(!qid || !title || !optins || !answer){
        ctx.response.body={
            msg:'参数不全',
            code:0
        }
        return
    }
    let [err1,[res1]] = await hpe(ctx.mysql(`select * from questions order by qid desc limit 1;`));
    if(err1){
        ctx.response.body={
            msg:err1,
            code:0
        }
        return
    }
    let [err,[res]] = await hpe(ctx.mysql(`insert into questions (qid, title, options, answer, qtype, create_date) values ('${qid}', '${title}','${options}','${answer}','1',localtimestamp())`))
    if(err){
        ctx.response.body={
            msg:err,
            lastRecord:res1,
            code:0
        }
        return
    }
    ctx.response.body = {
        msg:"添加成功",
        res,
        code:1
    }
}
/**
 * @description: 随机返回指定数量的题目
 * @method GET
 * @param limit {number} 
 * @return: 
 */
let getq = async (ctx,next)=>{
    //随机选取5道题
    let {limit=5} = ctx.request.query
    // let [err,res] = await hpe(ctx.mysql(`SELECT * FROM questions WHERE qid >= ((SELECT MAX(qid) FROM questions)-(SELECT MIN(qid) FROM questions)) * RAND() + (SELECT MIN(qid) FROM questions)  LIMIT ${limit}`))
    let [err,res] = await hpe(ctx.mysql(`SELECT * FROM questions order by rand()  LIMIT ${limit}`))
    if(err){
        ctx.response.body={
            msg:err,
            code:0
        }
        return
    }
    ctx.response.body={
        msg:'success',
        code:1,
        data: res
    }
}
module.exports = {
    "POST /addQuestion":addq,
    "GET /getQuestion":getq,
}