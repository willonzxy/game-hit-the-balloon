/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2017-11-11 22:26:56 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2017-11-11 22:44:51
 */
/**
 * 浏览器嗅探
 * 仅对移动端开放
 */
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){
        window.location.href = './404.html';
    }else{
        (function(){
            /**
             * 获取url传来的参数
             */
            document.getElementById('grade').innerHTML = parseInt(getRequest()['grade'])*20;
           
        })();
    }
}
browserRedirect();

