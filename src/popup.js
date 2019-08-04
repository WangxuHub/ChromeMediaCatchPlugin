
var btnTest = document.getElementById('btnTest');

btnTest.addEventListener('click',function(){
    alert(1111);
});


let btnChangeColor = document.getElementById('btnChangeColor');

chrome.storage.sync.get('color', function(data) {
  btnChangeColor.style.backgroundColor = data.color;
  btnChangeColor.setAttribute('value', data.color);
});

btnChangeColor.onclick = function (element) {
    let color = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: 'document.body.style.backgroundColor = "' + color + '";' });
    });
};


var btnCreateTab = document.getElementById('btnCreateTab');
btnCreateTab.onclick = function (element) {
    chrome.tabs.create({ url: 'https://www.baidu.com/' }, function () {
        alert(1111);
    });
};


document.getElementById('btnShowMedia').onclick=function(){
    var url = chrome.runtime.getURL('MediaView.html');
    chrome.tabs.create({ url: url }, function () { });
};



document.getElementById('btnMsg').onclick = function () {
    sendMSg('content.getVideoSrc', function (data) {
        console.log(data);
    });
};


document.getElementById('btnViewMsg').onclick = function () {
    sendMSg('view.setSrc', "cccccccccccccccc", function (data) {
        console.log(data);
    });
};




function sendMSg(){
    var argus = arguments;
    var cmdType = argus[0];
    var sendArgus = [];
    for(var i=1;i< argus.length - 1;i++){
        sendArgus.push(argus[i]);
    }
    var callback = argus[argus.length - 1];
    
    var msgObj = {
        cmdType:cmdType,
        argus:sendArgus
    };

    var queryTabs = { active: true, currentWindow: true };

    if (cmdType.indexOf('view.') === 0) {
        let url = chrome.runtime.getURL('MediaView.html');
        queryTabs = { url: url };
    }

    chrome.tabs.query(queryTabs, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msgObj, function (response) {
            callback(response);
        });
    });
}




