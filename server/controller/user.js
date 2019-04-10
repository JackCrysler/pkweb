/*
 * @Description: 用户相关接口
 * @Author: JackSmart
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-01 15:42:06
 * @LastEditTime: 2019-04-10 13:55:22
 */
const utils = require('../utils/utils')
const fs = require('fs')
const privatekey = fs.readFileSync(process.cwd()+'/server/private.key','utf-8')
const {hpe,cipher,hmac} = utils;

let register = async (ctx,next)=>{
    //获取用户注册时的用户名和密码
    let {username,password} = ctx.request.body
    //crypto 对称加密
    let uid = cipher(username, privatekey)
    //crypto 非对称加密
    let secretPwd = hmac(password, privatekey)
    //添加数据库
    let [err,res] = await hpe(ctx.mysql(`insert into pkuser (uid, username, password, create_date) values ('${uid}', '${username}', '${secretPwd}',LOCALTIMESTAMP())`))

    if(err){
        ctx.response.body = {
            msg:err,
            code: 0
        }
    }else{
        ctx.response.body = {
            msg:'success',
            code: 1
        }
    }
    
}

let login = async (ctx,next)=>{
    //使用用户名即可登陆，昵称可选
    let {username,nickname,password} = ctx.request.body;
    console.log({username,nickname,password})
    let secretPwd = hmac(password, privatekey)
    let [err,[res]] = await hpe(ctx.mysql(`select * from pkuser where username='${username}' and password='${secretPwd}'`))

    if(err){
        ctx.response.body = {
            msg:err,
            code: 0
        }
        return
    }
    if(res.length==0){
        ctx.response.body = {
            msg:'用户不存在',
            code: 0
        }
        return
    }
    //如果登陆时有nickname，更新数据库
    if(nickname){
        let [err] = await hpe(ctx.mysql(`update pkuser set nickname='${nickname}' where username='${username}'`))
        if(err){
            ctx.response.body = {
                msg:err,
                code: 0
            }
        }
    }
    delete res.password;
    ctx.response.body = {
        msg:'success',
        code: 1,
        data: res
    }
}
/**
 * @description: 上传头像
 * @param {type} 
 * @return: 
 */
let portrait = async (ctx)=>{
    let {uid,purl} = ctx.request.body
    if(!uid || !purl){
        ctx.response.body={
            code:0,
            msg:'params uid,purl are missing'
        }
        return
    }
    let [err,res] = await hpe(ctx.mysql(`update pkuser set portrait_url='${purl}' where uid='${uid}'`))

    if(err){
        ctx.response.body={
            code:0,
            msg:err
        }
        return
    }
    ctx.response.body={
        code:1,
        msg:'success'
    }

}


module.exports = {
    'POST /register':register,
    'POST /login':login,
    'POST /addPortrait':portrait,
}