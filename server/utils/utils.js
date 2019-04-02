const crypto = require('crypto');
//非对称加密
function hmac(password,secret){
    const hmac = crypto.createHmac('sha256', secret);

    hmac.update(password);
    return hmac.digest('hex')
}
//对称加密  
function cipher(data,key){
    const cipher = crypto.createCipher('aes192', key);

    let encrypted = cipher.update(data, 'utf8', 'hex');

    encrypted += cipher.final('hex');

    return encrypted
}

//对称解密
function decipher(encrypted,key){
    const decipher = crypto.createDecipher('aes192', key);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted
}
//处理promise错误
function handlePromiseError(promise){
    if (!promise || !Promise.prototype.isPrototypeOf(promise)) {
        return new Promise((resolve, reject) => {
            reject(new Error("requires promises as the param"));
        }).catch(err => {
            return [err, null];
        })
    }
    return promise
        .then(function() {
            return [null, ...arguments]
        })
        .catch(err => {
            return [err, null];
        })
}


module.exports = {
    cipher,
    decipher,
    hmac,
    hpe:handlePromiseError
}