let services = require('../service')
module.exports = (socket, pkRooms, io, userCollection)=>{
    
    socket.on('get result',async (info,callback)=>{
        let {uid} = info;
        if(!uid){
            socket.send('uid is missing')
            return
        }
        let {roomid} = userCollection[uid];
        //room 房间2个人的基本信息  q该房间的题目  status房间状态
        let {room, q, status} = pkRooms[roomid];
        let u1 = room[0];
        let u2 = room[1];
        let u1Scrore = Object.values(u1.score).reduce((start,step)=>{
            return start+=step*1
        },0)
        let u2Scrore = Object.values(u2.score).reduce((start,step)=>{
            return start+=step*1
        },0)
        //确认分数
        callback({
            result:[
                {
                    ...u1,
                    sum:u1Scrore
                },
                {
                    ...u2,
                    sum:u2Scrore
                },
            ],
            msg:'The Winner：'+ (u1Scrore>u2Scrore?u1.username:u2.username)
        })
        let winnerId = u1Scrore>u2Scrore?u1.uid:u2.uid;
        let re = await services.updatePkUser(winnerId)
        
    })
}