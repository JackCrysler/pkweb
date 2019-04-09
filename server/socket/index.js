let utils = require('../utils/utils')
let handleRoom = require('./room')
let handleAnwser = require('./answer')
let handleQuestion = require('./question')
let handleResult = require('./result')
let handleDestroy = require('./destroy')
let {decipher, hpe} = utils;
//进入pk的所有用户统计, 一一映射
let userCollection={}
//pk房间
let pkRooms = {}
let pkRoomId = 1;
module.exports = (app,io)=>{
    
    io.on('connection',async (socket)=>{
        let {uid} = socket.handshake.query;
        // console.log('socket.client.sockets:::\n',socket.client.sockets)
        if(!uid || uid=='undefined'){
            //send 等价于 emit('message','info')
            socket.send('query params uid missing')
            return
        }

        //用户验证和信息获取
        let username = decipher(uid, app.context.privatekey);
        
        let [err0,[res0]] = await hpe(app.context.mysql(`select * from pkuser where username='${username}'`))
        
        if(err0){
            socket.send(err)
            return
        }
        if(!res0){
            socket.send('user dose not exist')
            return;
        }
        

        if(!pkRooms[pkRoomId]){//如果没有房间，就创建一个房间
            //选取一套题目
            let [err1,res1] = await hpe(app.context.mysql(`SELECT * FROM questions order by rand() LIMIT 5`))
            if(err1){
                socket.send('获取题目失败')
                return;
            }
            pkRooms[pkRoomId]={
                room:[],
                q:res1,
                status: 1,
                
            }
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

        //找到对应的pkroom，并更新数据，根据uid固定在某一个room
        let pkroom = pkRooms[userCollection[uid].roomid].room;
        let defineUser = {
            uid: uid,
            nickname: res0.nickname,
            username: res0.username,
            score: {},
            status:1
        }
        if(pkroom.length==0){
            pkroom.push({
                ...defineUser
            })
            socket.send(`${res0.username}-${res0.nickname} has joined room ${userCollection[uid].roomid}`)
        }
        if(pkroom.length==1){
            if(pkroom[0].uid!=uid){
                pkroom.push({
                    ...defineUser
                })
                socket.send(`${res0.username}-${res0.nickname} has joined room ${userCollection[uid].roomid}`)
                pkRooms[pkRoomId].createtime = Date.now()
                //递增pkRoomId
                pkRoomId+=1
            }else{
                socket.send(`${res0.username}-${res0.nickname} already joined room ${userCollection[uid].roomid}`);
            }
        }
        if(pkroom.length==2){
            if(pkroom.some(item=>item.uid==uid)){
                socket.send(`${res0.username}-${res0.nickname} already joined room ${userCollection[uid].roomid}`);
            }else{
                // console.log('uid', uid)
                // console.log('pkroom', pkroom)
                socket.send(`user join room meet with unknown server error`);
            }
        }

        socket.on('get all rooms', callback=>{
            callback(pkRooms)
        })

        //更新pkroom
        pkRooms[userCollection[uid].roomid].room = pkroom;

        //处理所有的pkroom
        handleRoom(pkRooms, io, userCollection);

        //获取题目
        handleQuestion(socket, pkRooms, io, userCollection)

        //处理答案
        handleAnwser(socket, pkRooms, io, userCollection)

        //获取结果
        handleResult(socket, pkRooms, io, userCollection)

        //销毁房间
        handleDestroy(socket, pkRooms, io, userCollection)
    })
}
