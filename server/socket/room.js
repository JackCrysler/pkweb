module.exports = (pkRooms, io, userCollection) => {
    // console.log('pkrooms',pkRooms)
    Object.entries(pkRooms).forEach(item=>{
        let [rid,{room,q}] = item;
        if(room.length<2) return;
        let U1 = room[0];
        let socektU1 = userCollection[U1.uid]
        let U2 = room[1];
        let socektU2 = userCollection[U2.uid];
        
        io.to(socektU1.socketid).emit('pkinfo', U2);
        io.to(socektU2.socketid).emit('pkinfo', U1);
    })
    
}

/* 
    数据结构参考
    let room = {
        1:{
            room:[
                { 
                    uid: '6b061ee23b6c096f59ae9892540f1811',
                    nickname: null,
                    username: '16678900987' 
                },
                { 
                    uid: 'efe96ddc3adbffb25966dc6ff9207bc1',
                    nickname: null,
                    username: '13999998888'
                }
            ],
            q:[],
            status:1
        }
    }
    [[1,[]],1,[]]
    let userCollection = {
        "4d3fbf41588e373c21a1194f5a3e8c67":{"socketid":"9n68XLAVd1bxMM6wAAAA","roomid":1},
        "6b061ee23b6c096f59ae9892540f1811":{"socketid":"E0V5OT0_aGc_mxupAAAB","roomid":1},
        "2e139beffe138e76587be8525bdfd056":{"socketid":"4OCIZxbdCmzVKkPnAAAC","roomid":1}
    }
    */