var fs=require('fs');
fs.readFile(__dirname+"/css/bootstrap.css","utf8",function(err,content){
if(err)
console.log(err);
else
console.log(content);
});
console.log(__dirname + "/css/bootstrap.css");
