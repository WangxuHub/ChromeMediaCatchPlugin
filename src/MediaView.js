

  var $video = $("#main-video");
  $video.css('min-height', $video.width() / 16 * 9 + 'px');

 var player = videojs('main-video', {
     controls: true,
     //sources: [{
     //    src: '/video/v1.mp4',
     //    type: 'video/mp4'
     //}]
     //  language:'zh-CN'
 });

 window.player = player;
 
 var link = './assets/123.m3u8';
 // var link = 'https://pl-ali.youku.com/playlist/m3u8?vid=XMjY4NjM5Mzc0MA%3D%3D&type=mp4hdv3&ups_client_netip=3a6593ee&utid=XKrmERQ5tDkCAbeeXGydsjsZ&ccode=0502&psid=401996804baacdaa0bc46ea449ac620a&ups_userid=442966237&ups_ytid=442966237&duration=1433&expire=18000&drm_type=1&drm_device=7&play_ability=1024&ups_ts=1558884113&onOff=0&encr=0&ups_key=be98c1d23ca26bb96b595a40c850dfab';
 // var link = 'https://valipl-vip.cp31.ott.cibntv.net/6572A8805983B717F3AC8508D/03000600005C6B7F1B0F653011BA6AB0B7511C-FD5A-49DD-A115-B35EF7C8B8C4-1-114.m3u8?ccode=0502&duration=1433&expire=18000&psid=a2430f38c13e458db0a5ae2c54d0765c&ups_client_netip=3a6593ee&ups_ts=1558882963&ups_userid=442966237&utid=jphxFY%2FkBiQCATplk%2B67zVyD&vid=XMjY4NjM5Mzc0MA%3D%3D&vkey=A1f5e0afbef081630dcb56f7069baeebb&sm=1&operate_type=1&bc=2';
 player.src({ src: link, type: "application/x-mpegURL" });



 $("#btnChangeSrc").click(function(){
   var link = $("#iptSrc").val();
   player.src({ src: link, type: "application/x-mpegURL" });
   return false;
 });



var methodHandler = {};
var msgType = "view"
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var cmdType = request.cmdType;
    var argus = request.argus||[];
    argus.push(sendResponse);

    if (cmdType.indexOf(msgType + ".") !== 0) {
        return;
    }

    var innerCmdType = cmdType.substr(msgType.length+1);

    methodHandler[innerCmdType].apply(methodHandler, argus);
});


methodHandler.setSrc = function (src, cb) {
  src += "12312312";
  cb(src);
}