import io from 'socket.io-client'
let uid = window.location.search.substring(1).split('=')[1];

let socket = io('ws://127.0.0.1:8001?uid='+uid,{
    autoConnect:false
})

socket.on('message',info=>{
    console.log('socket info ====> ', info)
})

export default socket
