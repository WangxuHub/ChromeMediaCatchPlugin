chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");

    var cmdType = request.cmdType;
    var argus = request.argus||[];

    argus.push(sendResponse);

    methodHandler[cmdType].apply(methodHandler, argus);
});

var methodHandler = {};

methodHandler.getVideoSrc=function(cb){
    var src = document.querySelector(".txp_video_container.txp_video_fit_cover video[src]").src;

    cb({videoSrc:src});
}

