var methodHandler = {};
var msgType = "content"
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


methodHandler.getVideoSrc=function(cb){
    var src = location.href;//  document.querySelector(".txp_video_container.txp_video_fit_cover video[src]").src;
    cb({videoSrc:src});
}

