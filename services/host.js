var path = require('path');
var fs = require('fs');
var ws = require("nodejs-websocket");
console.log("开始建立连接...");

var server = ws.createServer(function (conn) {
    conn.on("text", function (str) {
        var json = null;

        try {
            json = JSON.parse(str);
            handler(json, conn);
            return;
        } catch (e) {
            console.error(e);
            console.warn('it is not json');
        }

        console.log("收到的信息为:" + str.substr(0,200))

    })
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });
}).listen(3000)
console.log("WebSocket建立完毕");

var methodHander = {};
function handler(json, conn) {
    var postType = json.postType;
    var data = json.data;

    if (methodHander[postType]) {
        methodHander[postType](data, function (data) {
            conn.sendText(data);
        });
    }
}

var existDir = {};
methodHander.uploadVideoFrame = function (json, cb) {
    var currentTime = json.currentTime
    var base64Image = json.base64Image;
    var videoName= json.videoName;
    var root = path.join(__dirname, "videos");

    var dir = "";
    var index = videoName.lastIndexOf('.');
    if (index > 0) {
        dir = path.join(root, videoName.substr(0, videoName.lastIndexOf('.')));
    } else{
        dir = path.join(root, videoName);
    }

    if (!existDir[dir]) {
        if(!fs.existsSync(root)){
            fs.mkdirSync(root);
        }
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        // var stat = fs.statSync(dir);
        // if(!stat.isDirectory()){
        //     fs.mkdirSync(dir);
        // }
        existDir[dir] = true;
    }

    var fileName = path.join(dir, currentTime + '.png');

    var base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile(fileName, dataBuffer, function(err) {
        if(err){
            console.error("图片保存失败！！");
            console.error(err);
        }
    });
};