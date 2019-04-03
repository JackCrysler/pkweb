module.exports = (socket) => {
    socket.use((packet, next) => {
        let {
            uid
        } = packet;
        if (!uid) {
            return next();
        }
        socket.send('缺少 uid')
        next(new Error('缺少 uid'));
    });
}