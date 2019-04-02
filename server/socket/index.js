
let utils = require('../utils/utils')
let room = require('./room')
let {decipher, hpe} = utils;
//进入pk的所有用户统计
let userCollection={}
//pk房间
let pkRooms = {}
let pkRoomId = 1;
module.exports = (app,io)=>{
    
    io.on('connection',async (socket)=>{
        let {uid} = socket.handshake.query;
        
        if(!uid || uid=='undefined'){
            socket.emit('msg','query params uid missing')
            return
        }

        //用户验证和信息获取
        let username = decipher(uid, app.context.privatekey);
        
        let [err0,[res0]] = await hpe(app.context.mysql(`select * from pkuser where username='${username}'`))
        
        if(err0){
            socket.emit('msg',err)
            return
        }
        if(!res0){
            socket.emit('msg','user dose not exist')
            return;
        }

        if(!pkRooms[pkRoomId]){//如果没有房间，就创建一个房间
            pkRooms[pkRoomId]=[]
        } 

        //将用户id与socket.id建立一一对应关系
        if(userCollection[uid]){
            //如果用户已存在，更新socketid
            userCollection[uid].socketid = socket.id;
        }else{
            userCollection[uid]={
                socketid:socket.id,
                roomid:pkRoomId
            }
        }
        //找到对应的pkroom，并更新数据
        let pkroom = pkRooms[userCollection[uid].roomid];

        if(pkroom.length==0){
            pkroom.push({
                uid: uid,
                nickname: res0.nickname,
                username: res0.username
            })
            socket.emit('msg',`${res0.username}-${res0.nickname} has joined room ${userCollection[uid].roomid}`)
        }else if(pkroom.length==1){
            if(pkroom[0].uid!=uid){
                pkroom.push({
                    uid: uid,
                    nickname: res0.nickname,
                    username: res0.username
                })
                socket.emit('msg',`${res0.username}-${res0.nickname} has joined room ${userCollection[uid].roomid}`)
                //递增pkRoomId
                pkRoomId+=1
            }else{
                socket.emit('msg',`${res0.username}-${res0.nickname} already joined room ${userCollection[uid].roomid}`);
            }
        }else if(pkroom.length==2){
            if(pkroom.some(item=>item.uid==uid)){
                socket.emit('msg',`${res0.username}-${res0.nickname} already joined room ${userCollection[uid].roomid}`);
            }else{
                socket.emit('msg',`user join room meet with error`);
            }
        }
        //更新pkroom
        pkRooms[userCollection[uid].roomid] = pkroom;
        //处理所有的pkroom
        room(pkRooms, io, userCollection)
        
    })
}
