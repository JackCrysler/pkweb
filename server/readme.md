# io

## sql table

    1. user
    2. questions
    3. awards

## socket api

        event: message  |   解释：client客户端接收服务器信息
        
        event: pkinfo   |  解释：向socket用户发送pk对象信息
        
        event: 'get question'   |  解释：获取题目信息
        
            socket.emit('get question',{ uid },(res)=>{
                console.log(res)
            })

        event: 'set score'  |  解释：向PK对象发送本题得分

            socket.emit('set score',{
                uid, score:Math.floor(Math.random()*80), qid:'123'
            },function(res){
                console.log(res)
            })

        event: 'get pkscore'  |  解释：获取pk对象的题目得分

            socket.on('pk score',{qid,score,uid}=>{
                console.log(qid,score)
            })

        event: 'get result'  |  解释：获取答题结果
            
            socket.emit('get result',{uid},(res)=>{
                console.log(res)
            })

        event: 'get all rooms'  |  解释：获取所有的房间

            socket.emit('get all rooms', (res)=>{
                console.log(res)
            })

        event: 'user left'  |   房间中的用户中途离开 

            socket.on('user left',info=>{
                console.log(info)
            })

    tips:

        如果发生中断，请尝试在客户端先socket.close()再socket.open()重新建立连接
