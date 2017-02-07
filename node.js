var http=require('http');
var fs = require('fs');
var param_url=require('url');
var query=require('querystring');
var lodash=require('lodash');
function loadFile(filename,type,res)
{
	console.log(filename);
	fs.readFile(__dirname + filename,"utf8",function(err,content){
		if(err)
			console.log(err);
		else
		{
			res.writeHead(200,{"Content-type":type});
			res.write(content);
			res.end();
		}
	});	
}
http.createServer(function(req,res)
{
	var url=req.url;
	var parts=param_url.parse(url,true);
	switch(parts.pathname)
	{
		case "/":
			loadFile("/index.html","text/html",res);
			break;
		case "/css/view.css":
			loadFile("/css/view.css","text/css",res);
			break;
		case "/css/simplePagination.css":
			loadFile("/css/simplePagination.css","text/css",res);
			break;
		case "/js/index.js":
			loadFile("/js/index.js","text/javascript",res);
			break;
		case "/css/bootstrap.css":
			loadFile("/css/bootstrap.css","text/css",res);
			break;
		case "/js/jquery.twbsPagination.js":
			loadFile("/js/jquery.twbsPagination.js","text/javascript",res);
			break;
		case "/img/logo.png":
			loadFile("/img/logo.png","image/png",res);
			break;
		case "/img/head.jpg":
			loadFile("/img/head.jpg","image/jpg",res);
			break;
		case "/getRepo":
			if(parts.path!=null)
			{
					var query_name=parts.query;
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
							sendItems.push(items[i]);
						res.writeHead(200,{"Content-type":"text/plain"});
						res.write(JSON.stringify(sendItems));
						res.end();
					}
				});
			}	
			break;
		default:
			res.writeHead(404, {"Content-Type": "text/plain"});
    		res.write("404 Not found");
			res.end();
			break; 
	}
}).listen(3165);