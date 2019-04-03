
module.exports = (socket, pkRooms, io, userCollection)=>{
    
    socket.on('set answer',(info,callback)=>{
        let {uid, answer} = info;
        let {socketid, roomid} = userCollection[uid]
        //room 房间2个人的基本信息  q该房间的题目  status房间状态
        let {room, q, status} = pkRooms[roomid]
        callback(q)
        // room.forEach(pk=>{
        //     io.to(userCollection[pk.uid].socketid).emit('return question', q)
        // })

    })
}