/*
 * @Description: 当用户断掉连接之后，将其从房间中移除
 * @Author: JackSmart
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-03 15:51:19
 * @LastEditTime: 2019-04-10 16:17:37
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
        
        //关闭房间里另一个人的socket连接，然后删除对应的房间和socketid映射
        let leftUserSocket = io.of('/').sockets[userCollection[leftUserId].socketid]
        if(leftUserSocket){
            leftUserSocket.emit('user left', {
                "msg":"pk target has left the room, please replay",
                'user':uid
            })
            leftUserSocket.send('PK对手已离开，请重新进入PK');
            leftUserSocket.disconnect(true)
            delete pkRooms[userCollection[uid].roomid]
            delete userCollection[uid]
            delete userCollection[leftUserId];
        }
        
    })
}


