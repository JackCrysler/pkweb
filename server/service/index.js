let mysqlCfg = require('../mysql')
let utils = require('../utils/utils')
let {
    hpe
} = utils
let power;
let updatePkUser = async (uid) => {
    let [err0, res0] = await hpe(mysqlCfg.mysqlp(`select * from pkuser where uid='${uid}'`))
    if (err0) return {
        msg: err0,
        code: 0
    }
    
    if (res0[0].power != null && res0[0].power!= 'NaN'){
        power = res0[0].power * 1 + 1;
    }else{
        power = 1
    }

    let [err1, res1] = await hpe(mysqlCfg.mysqlp(`update pkuser set power='${power}' where uid='${uid}'`))
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
    updatePkUser
}