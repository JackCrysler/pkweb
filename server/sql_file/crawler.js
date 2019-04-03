const cheerio = require('cheerio')
const fs = require('fs')

let html = fs.readFileSync(__dirname+'/questions.html','utf-8')
const $ = cheerio.load(html)
let p = $('html').find('.title')
let arr = []
p.each((index,item)=>{
    arr.push($(item).text())
})
let ar1=[]
let ar2 = []
arr.forEach(item=>{
    let tmp=[]
    tmp = item.split('？')
    
    if(tmp.length==2){
        ar1.push(tmp)
    }else{
        ar2.push(tmp)
    }
    
})
let ar3=[]
let ar4=[]
ar1.forEach((item,index)=>{
    if(item[1].indexOf('（')>-1){
        let s= item[1].split('（')
        let r = s[1].substring(0,1)
        ar3.push([index,item[0],s[0],r])
    }else{
        ar4.push(item)
    }

})
// console.log('ar4',ar3)

module.exports = {
    choiceQuestion:ar3,
    sortQestion:ar4
}