

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ color: '#3aa757' }, function () {
        console.log("The color is green.");
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'developer.chrome.com' },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});




chrome.webRequest.onCompleted.addListener(function (details){
    console.log(details.url);
    if(details.url.indexOf('.m3u8')>0){
        console.error(details.url);
    }
    //console.log(details);
}, {
    urls:[
        "<all_urls>"
    ],
    types: ["xmlhttprequest"]
},
[
    "responseHeaders"
]
);


// ========================================================================================================== 

var methodHandler = {};
var msgType = "bg"
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