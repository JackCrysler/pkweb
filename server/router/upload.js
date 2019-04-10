// content-type: 
// 1 application/json => application/x-www-form-urlencoded 字符串
// 2 multipart/form-data
// 3 text/plain


const multer = require('koa-multer')
const path = require('path')
//文件存储路径
const fileSave = path.resolve(__dirname, '../../public/uploads/')

//文件上传
//配置
let storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, fileSave)
    },
    //修改文件名称
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split("."); //以点分割成数组，数组的最后一项就是后缀名

        cb(null, fileFormat[0] + "." +Date.now()+'.' + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
let upload = multer({
    storage: storage
});


module.exports = (router) => {
    // content-type  multipart/form-data  文件域 name=='file' post
    router.post('/upload', upload.single('file'), async (ctx, next) => {
        let {file} = ctx.req
        let purl = `/uploads/${file.filename}`;
        ctx.response.body = {
            code: 1,
            path: purl,
            filename: file.filename //返回文件名
        }

        next()
    })
}