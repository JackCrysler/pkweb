module.exports = (pkRooms, io, userCollection) => {
    
    Object.entries(pkRooms).forEach(item=>{
        let [rid,room] = item;
        if(room.length<2) return;
        let u1 = room[0];
        let u1Socekt = userCollection[u1.uid]
        let u2 = room[1];
        let u2Socekt = userCollection[u2.uid];
        io.to(u1Socekt.socketid).emit('pkinfo', u2)
        io.to(u2Socekt.socketid).emit('pkinfo', u1)
    })
    
}

/* 
    数据结构参考
    let rooms = {
        1:[
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
        ]
    }
    let userCollection = {
        "4d3fbf41588e373c21a1194f5a3e8c67":{"socketid":"9n68XLAVd1bxMM6wAAAA","roomid":1},
        "6b061ee23b6c096f59ae9892540f1811":{"socketid":"E0V5OT0_aGc_mxupAAAB","roomid":1},
        "2e139beffe138e76587be8525bdfd056":{"socketid":"4OCIZxbdCmzVKkPnAAAC","roomid":1}
    }
    */