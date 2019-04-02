const fs = require('fs')
const path = require('path')
const root = path.resolve(process.cwd(),'server')
function setControllers(router,dir = 'controller') {
    let cpath = path.resolve(root, dir)
    let files = fs.readdirSync(cpath)
    files.forEach((file) => {
        if (file.endsWith('.js')) {
            let content = require(cpath + '/' + file);
            addRoute(router,content)
        }
    })
}

function addRoute(router,obj) {
    for (let i in obj) {
        if (i.startsWith('POST ')) {
            router.post(i.substring(5), obj[i])
        }
        if (i.startsWith('GET ')) {
            router.get(i.substring(4), obj[i])
        }
    }
}


module.exports = (router,dir) => {
    //  add route 
    setControllers(router,dir)

    return router.routes()
}