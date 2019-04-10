let mysqlCfg = require('../mysql')
let utils = require('../utils/utils')
let {
    hpe
} = utils

let updateWinner = async (winnerId, loserId) => {
    let [err0, res0] = await hpe(mysqlCfg.mysqlp(`select * from pkuser where uid='${winnerId}'`))
    if (err0) return {
        msg: err0,
        code: 0
    }
    let power,pktimes,winningCount;
    power = (res0[0].power != null && res0[0].power!= 'NaN') ? (res0[0].power * 1 + 10):10;
    pktimes = res0[0].pktimes*1+1
    winningCount = res0[0].winning_count+1
    let [err1, res1] = await hpe(mysqlCfg.mysqlp(`update pkuser set power='${power}',pktimes='${pktimes}',winning_count='${winningCount}'  where uid='${winnerId}'`))
    if (err1) return {
        msg: err1,
        code: 0
    }
    return {
        msg: res1,
        code: 1
    }
}
let updateLoser = async (loserId) => {
    let [err0, res0] = await hpe(mysqlCfg.mysqlp(`select * from pkuser where uid='${loserId}'`))
    if (err0) return {
        msg: err0,
        code: 0
    }
    let pktimes;
    pktimes = res0[0].pktimes*1+1
    let [err1, res1] = await hpe(mysqlCfg.mysqlp(`update pkuser set pktimes='${pktimes}' where uid='${loserId}'`))
    if (err1) return {
        msg: err1,
        code: 0
    }
    return {
        msg: res1,
        code: 1
    }
}
module.exports = {
    updateWinner,
    updateLoser
}

