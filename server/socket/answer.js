
module.exports = (socket, pkRooms, io, userCollection)=>{
    
    socket.on('set score',(info,callback)=>{
        let {uid, score, qid} = info;
        if(!uid|| !score|| !qid){
            socket.send('one of uid, score, qid is missing')
            return
        }
        let {roomid} = userCollection[uid];
        //room 房间2个人的基本信息  q该房间的题目  status房间状态
        let {room, q, status} = pkRooms[roomid];
        let scoredRoom = room.map(target => {
            if(target.uid==uid){
                target.score[qid] = score
            }else{
                let pkTargetSocket = userCollection[target.uid]
                io.to(pkTargetSocket.socketid).emit('pk score', {...info});
            }
            return target
        });
        pkRooms[roomid].room = scoredRoom;
        //确认分数
        callback({
            ...info,
            msg:'分数已确认'
        })
        
    })
}