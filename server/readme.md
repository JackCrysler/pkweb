# io

## sql table

    1. user
    2. questions
    3. awards

## socket api

    event: msg
    解释：向socket用户发送服务器信息

    event: pkinfo
    解释：向socket用户发送pk对象信息

    event: 'get question'
    解释：获取题目信息

        socket.emit('get question',{
            uid
        },(res)=>{
            console.log(res)
        })


