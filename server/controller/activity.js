const utils = require('../utils/utils')
const _ = require('lodash')
let {hpe} = utils
//抽福袋
let awards = [
    {
        title:"5¥红包",
        code: 1
    },
    {
        title:"10¥红包",
        code: 2
    },
    {
        title:"50¥京东E卡",
        code: 3
    },
    {
        title:"四件套",
        code: 4
    },
    {
        title:"50空粉币",
        code: 5
    },
    {
        title:"666空粉币",
        code: 6
    },
    {
        title:"谢谢参与",
        code: 0
    }
]
let jackpot=[]
for(let i=0; i<100; i++){
    // console.log(i)
    switch (true){
        case (i<30): jackpot.push(1);
        break;
        case i<40: jackpot.push(2);
        break;
        case i<45: jackpot.push(3);
        break;
        case i<50: jackpot.push(4);
        break;
        case i<70: jackpot.push(5);
        break;
        case i<90: jackpot.push(6);
        break;
        case i<100: jackpot.push(0);
        break;
    }
}
jackpot = _.shuffle(jackpot)

let luckyBag = async (ctx,next)=>{
    let {uid, type=0} = ctx.request.query;
    let energy = {
        '0':20,
        '1':50,
        '2':100
    }
    let [err, [res]] = await hpe(ctx.mysql(`select * from pkuser where uid='${uid}'`))
    if(err){
        ctx.response.body={
            msg:err,
            code:0
        }
    }else{
        delete res.password;
        //0:20  1:50  2:100
        if(!energy[type]){
            ctx.response.body={
                msg:"params error， hope for type: 0,1,2",
                code:0
            }
            return
        }
        if(!res.power || res.power*1<energy[type]){
            ctx.response.body={
                msg:"能量不够",
                code:1
            }
            return
        }

        let prizeCode = jackpot[Math.floor(Math.random()*100)];
        
        let prize = awards.filter(item=>item.code==prizeCode);
        let {title,code} = prize[0];
        let [err] = await hpe(ctx.mysql(`insert into awards (uid, award, code, create_date) values ('${uid}', '${title}','${code}', LOCALTIMESTAMP())`))

        if(err){
            ctx.response.body={
                msg:err,
                code:0
            }
            return
        }
        let leftPower = res.power-energy[type]
        let [error, results] = await hpe(ctx.mysql(`update pkuser set power='${leftPower}' where uid='${uid}'`))
        if(error){
            ctx.response.body={
                msg:err,
                code:0
            }
            return
        }
        ctx.response.body={
            msg:"success",
            code:1,
            data: prize
        }
    }
    
}

module.exports = {
    "GET /luckyBag":luckyBag
}