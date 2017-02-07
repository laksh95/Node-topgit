var http=require('http');
var fs = require('fs');
var param_url=require('url');
var query=require('querystring');
var lodash=require('lodash');
http.createServer(function(req,res)
{
	var url=req.url;
	var parts=param_url.parse(url,true);
	switch(parts.pathname)
	{
		case "/":

			fs.readFile(__dirname + '/index.html','utf8',function(err,content){
				if(err)
				{
					console.log(err);
				}
				else
				{
					res.writeHead(200,{"Content-type":"text/html"});
					res.write(content);
					res.end();
				}
			});
			break;
		case "/css/view.css":

			fs.readFile(__dirname + "/css/view.css","utf8",function(err,content){
				if(err)
					console.log(err);
				else
				{
					res.writeHead(200,{"Content-type":"text/css"});
					res.write(content);
					res.end();
				}
			});
			break;
		case "/css/simplePagination.css":

			fs.readFile(__dirname + "/css/simplePagination.css","utf8",function(err,content){
				if(err)
					console.log(err);
				else
				{
					res.writeHead(200,{"Content-type":"text/css"});
					res.write(content);
					res.end();
				}
			});
			break;
		case "/js/index.js":

			fs.readFile(__dirname + "/js/index.js","utf8",function(err,content){
				if(err)
					console.log(err);
				else
				{
					res.writeHead(200,{"Content-type":"text/javascript"});
					res.write(content);
					res.end();
				}
			});
			break;
		case "/img/logo.png":

			fs.readFile(__dirname+  "/img/logo.png","utf8",function(err,content){
				if(err)
					console.log(err);
				else
				{
					res.writeHead(200,{"Content-type":"image/png"});
					res.write(content);
					res.end();
				}
			});
			break;
		case "/img/head.jpg":

			fs.readFile(__dirname+ "/img/head.jpg","utf8",function(err,content){
				if(err)
					console.log(err);
				else
				{
					res.writeHead(200,{"Content-type":"image/jpg"});
					res.write(content);
					res.end();
				}
			});
			break;
		case "/css/bootstrap.css":

			fs.readFile(__dirname + "/css/bootstrap.css","utf8",function(err,content){
				if(err)
					console.log(err);
				else
				{
					res.writeHead(200,{"Content-type":"text/css"});
					res.write(content);
					res.end();
				}
			});
			break;
		case "/js/jquery.twbsPagination.js":

			fs.readFile(__dirname + "/js/jquery.twbsPagination.js","utf8",function(err,content){
				if(err)
					console.log(err);
				else
				{
					res.writeHead(200,{"Content-type":"text/javascript"});
					res.write(content);
					res.end();
				}
			});
			break;
		case "/getRepo":
			if(parts.path!=null)
			{
					var query_name=parts.query;
					console.log("query_name");
					console.log(query_name);
					var company=query_name.company;
					var page=query_name.page;
					var items=[];
				fs.readFile(__dirname  +"/data.json","utf8",function(err,content){
					if(err)
						console.log(err);
					else
					{
						var data=JSON.parse(content).items;
						for(var i=0;i<data.length;i++)
						{
							if(lodash.includes(data[i].full_name,company))
							{	
								items.push(data[i]);
							}
						}
						var sendItems=[];
						i=(page-1)*10;
						for(;i<page*10;i++)
						{	
							sendItems.push(items[i]);
						}
						res.writeHead(200,{"Content-type":"text/plain"});
						res.write(JSON.stringify(sendItems));
						res.end();
					}
				});
			}	
			break;
		// case "/getPages":

		// 	break;
		default:
			res.writeHead(404, {"Content-Type": "text/plain"});
    		res.write("404 Not found");
			res.end();
			break; 
	}
}).listen(3165);