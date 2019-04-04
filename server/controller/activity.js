/*
 * @Description: 活动相关接口
 * @Author: JackSmart
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-01 22:24:58
 * @LastEditTime: 2019-04-04 09:34:59
 */
const utils = require('../utils/utils')
const _ = require('lodash')
let {
    hpe
} = utils
//抽福袋
let awards = [{
        title: "5¥红包",
        code: 1
    },
    {
        title: "10¥红包",
        code: 2
    },
    {
        title: "50¥京东E卡",
        code: 3
    },
    {
        title: "四件套",
        code: 4
    },
    {
        title: "50空粉币",
        code: 5
    },
    {
        title: "666空粉币",
        code: 6
    },
    {
        title: "谢谢参与",
        code: 0
    }
]
let jackpot = []
for (let i = 0; i < 100; i++) {
    // console.log(i)
    switch (true) {
        case (i < 30):
            jackpot.push(1);
            break;
        case i < 40:
            jackpot.push(2);
            break;
        case i < 45:
            jackpot.push(3);
            break;
        case i < 50:
            jackpot.push(4);
            break;
        case i < 70:
            jackpot.push(5);
            break;
        case i < 90:
            jackpot.push(6);
            break;
        case i < 100:
            jackpot.push(0);
            break;
    }
}
jackpot = _.shuffle(jackpot)
/**
 * @description: 抽福袋
 * @param {type} 
 * @return: 
 */
let luckyBag = async (ctx, next) => {
    let { uid, type = 0 } = ctx.request.query;
    let energy = {
        '0': 20,
        '1': 50,
        '2': 100
    }
    let [err0, [res]] = await hpe(ctx.mysql(`select * from pkuser where uid='${uid}'`))
    if (err0) {
        ctx.response.body = {
            msg: err0,
            code: 0
        }
        return
    }

    delete res.password;
    //0:20  1:50  2:100
    if (!energy[type]) {
        ctx.response.body = {
            msg: "params error， hope for type: 0,1,2",
            code: 0
        }
        return
    }
    if (!res.power || res.power * 1 < energy[type]) {
        ctx.response.body = {
            msg: "能量不够",
            leftPower:res.power,
            code: 1
        }
        return
    }

    let prizeCode = jackpot[Math.floor(Math.random() * 100)];
    let prize = awards.filter(item => item.code == prizeCode);
    let {
        title,
        code
    } = prize[0];
    let [err1] = await hpe(ctx.mysql(`insert into awards (uid, award, code, create_date) values ('${uid}', '${title}','${code}', LOCALTIMESTAMP())`))

    if (err1) {
        ctx.response.body = {
            msg: err1,
            code: 0
        }
        return
    }
    let leftPower = res.power - energy[type]
    let [err3, results] = await hpe(ctx.mysql(`update pkuser set power='${leftPower}' where uid='${uid}'`))
    if (err3) {
        ctx.response.body = {
            msg: err,
            code: 0
        }
        return
    }
    ctx.response.body = {
        msg: "success",
        code: 1,
        data: prize
    }

}
/**
 * @description: 获取PK英雄榜
 * @param {type} 
 * @return: 
 */
let PKlist = async (ctx)=>{
    let { uid } = ctx.request.query;
    //查询该用户数据
    let [err0, [userdata]] = await hpe(ctx.mysql(`select * from pkuser where uid='${uid}'`))
    //查询所有列表
    let [err1, list] = await hpe(ctx.mysql(`select username,nickname,power,pktimes,winning_count from pkuser`))
    if(!err0 && !err1){
        delete userdata.password
        ctx.response.body={
            msg:userdata,
            code:1,
            pklist:list
        }
    }else{
        ctx.response.body={
            msg:[err0,err1],
            code:0
        }
    }
}

/**
 * @description: 我的奖品
 * @param {type} 
 * @return: 
 */
let prizes = async (ctx)=>{
    let { uid } = ctx.request.query;
    //查询该用户获奖信息
    let [err0, list] = await hpe(ctx.mysql(`select * from awards where uid='${uid}'`))
    
    if(!err0){
        ctx.response.body={
            msg:list,
            code:1
        }
    }else{
        ctx.response.body={
            msg:err0,
            code:0
        }
    }
}

/**
 * @description: 活动规则
 * @param {type} 
 * @return: 
 */
let rules = async (ctx)=>{
    let rules = [
        `每局比赛两人参与，五道题，答对一道题最多可得100分，答得越慢分越少，答错不得分。`,
        `有十秒时间限制，如果在第一秒答对，得100分，如果用了一秒（即还剩9秒），则得80分，剩8秒则得60分，以此类推`,
        `PK获胜得到10能量值，能量值超过20即可抽福袋`
    ]
    ctx.response.body={
        code:1,
        msg:'success',
        rules
    }
}
module.exports = {
    "GET /luckyBag": luckyBag,
    "GET /pklist":PKlist,
    "GET /prizes":prizes,
    "GET /rules":rules,
}