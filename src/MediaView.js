

  var $video = $("#main-video");
  //$video.css('min-height', $video.width() / 16 * 9 + 'px');

 var player = videojs('main-video', {
     controls: true,
     sources: [{
        src: '1.mp4',
        type: 'video/mp4'
     }]
     //  language:'zh-CN'
 });

 window.player = player;
 
//  var link = './assets/123.m3u8';
//  player.src({ src: link, type: "application/x-mpegURL" });



 $("#btnChangeSrc").click(function(){
   var link = $("#iptSrc").val();
   player.src({ src: link, type: "application/x-mpegURL" });
   return false;
 });



var video = $video[0];
var canvas = document.getElementById("canvasVideo");
var context = canvas.getContext("2d");

$("#btnPlay").click(function () {
  canvas.width = $video[0].videoWidth;
  canvas.height = $video[0].videoHeight;

  var timer = null;
  function draw1() {//绘制视频
    video.play();
    timer = setInterval(function () {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);//绘制视频
    }, 1000/30);
  };
  draw1();
});

(function () {
  var ws = new WebSocket('ws://127.0.0.1:3000');

  ws.onopen = function (e) {
    console.log("连接服务器成功");
    ws.send("game1");
  }
  ws.onclose = function (e) {
    console.log("服务器关闭");
  }
  ws.onerror = function () {
    console.log("连接出错");
  }

  ws.onmessage = function (e) {
    console.log(e);
  }

  $("#iptText").keydown(function (e) {
    if (e.keyCode == 13) {
      ws.send($(this).val());
    }
  });

  function send(method, data){
    ws.send(JSON.stringify({
      postType: method,
      data: data
    }));
  }

  $("#btnWsSend").click(function () {
    var videoName = "cc.mp4";

    setInterval(function () {
      var base64Image = canvas.toDataURL();
      var currentTime = video.currentTime;
      send('uploadVideoFrame', {
        base64Image: base64Image,
        currentTime: currentTime,
        videoName: videoName
      });
    }, 1000 / 25);
    return false;
  });
})();


// // 
// var methodHandler = {};
// var msgType = "view"
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     var cmdType = request.cmdType;
//     var argus = request.argus||[];
//     argus.push(sendResponse);

//     if (cmdType.indexOf(msgType + ".") !== 0) {
//         return;
//     }

//     var innerCmdType = cmdType.substr(msgType.length+1);

//     methodHandler[innerCmdType].apply(methodHandler, argus);
// });


// methodHandler.setSrc = function (src, cb) {
//   src += "12312312";
//   cb(src);
// }