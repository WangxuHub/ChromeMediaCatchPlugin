
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

    sendMSg('getVideoSrc', function (data) {
        console.log(data);
    });

    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (response) {
    //         console.log(response.farewell);
    //     });
    // });
};


function sendMSg(){
    var argus = arguments;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var cmdType = argus[0];
        var sendArgus = [];
        for(var i=1;i< argus.length - 2;i++){
            sendArgus.push(argus[i]);
        }
        var callback = argus[argus.length - 1];
        
        var msgObj = {
            cmdType:cmdType,
            argus:sendArgus
        };

        chrome.tabs.sendMessage(tabs[0].id, msgObj, function (response) {
            callback(response);
        });
    });
}




