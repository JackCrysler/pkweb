
module.exports = (socket, pkRooms, io, userCollection)=>{
    socket.on('get question',(info,callback)=>{
        let {uid} = info;
        //根据uid找到roomid
        let {roomid} = userCollection[uid]
        //根据roomid找到题目
        let {q} = pkRooms[roomid]
        //将题目返回
        callback(q)
    })
}