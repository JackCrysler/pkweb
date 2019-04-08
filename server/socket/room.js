module.exports = (pkRooms, io, userCollection) => {

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