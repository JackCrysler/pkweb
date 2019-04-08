/*
 * @Description: 当用户断掉连接之后，将其从房间中移除
 * @Author: JackSmart
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-03 15:51:19
 * @LastEditTime: 2019-04-08 21:26:16
 */

module.exports = (socket, pkRooms, io, userCollection)=>{
    socket.on('disconnect', (reason) => {
        // ...
        console.log(reason)
        let {uid} = socket.handshake.query;
        if(uid==undefined || uid==null){
            console.log('error: user left without count')
            return
        }
        let roominfo = pkRooms[userCollection[uid].roomid].room;
        if(roominfo.length<2) return
        let leftUser = roominfo.filter(userinfo=>userinfo.uid!=uid)[0];
        let leftUserId = leftUser.uid;
        let leftUserNickname = leftUser.nickname;
        
        console.log(Object.keys(io.sockets.sockets))
        //关闭房间里另一个人的socket连接
        let leftUserSocket = io.sockets.sockets[userCollection[leftUserId].socketid]
        if(leftUserSocket){
            leftUserSocket.disconnect(true)
            delete pkRooms[userCollection[uid].roomid]
            delete userCollection[uid]
            delete userCollection[leftUserId];
    
        }
        
        console.log('\n\n\n..........',pkRooms,userCollection)

    });
}


