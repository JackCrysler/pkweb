var fs = require('fs');
var cheerio = require('cheerio');

var myHtml = fs.readFileSync("questions.html");
var $ = cheerio.load(myHtml);
var t = $('html').find('p');

let RST = ''
t.each(function(i, ele) {
    getContent($(ele));
});
console.log(RST)

function getContent(node){
    
    node.children('span').each((i,el)=>{
        // $(el).find('span').each((k,v)=>{
        //     RST+=$(el).text().trim()
        //     RST+='\n'
        // })
        RST+=$(el).text()
    })
    
}