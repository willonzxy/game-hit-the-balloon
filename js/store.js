

var getCookie = function() {
    // (^| )name=([^;]*)(;|$),match[0]为与整个正则表达式匹配的字符串，match[i]为正则表达式捕获数组相匹配的数组；
    // var arr = document.cookie.match(new RegExp("(^| )"+attrName+"=([^;]*)(;|$)"));
    // if(arr != null) {
    //     return unescape(arr[2]);
    // }
    // return null;
    var cookie = document.cookie,
        obj = {};
    for(var key in arguments){//key = 0,1,2..下标索引
        var pattern = '\\b'+arguments[key]+'=[^;]+';
        var reg = new RegExp(pattern);
        var val = decodeURI(reg.exec(cookie).split('=')[1]);
        obj[arguments[key]] = val;
    }
    return obj;
}

var setCookie = function(obj,time){
    time = time || 7;
    var date = new Date();
    date.setData(date.getDate()+time);
    for(var key in obj){
        document.cookie = key+'='+encodeURI(obj[key])+'; expires='+date.toUTCString();
    }
}
/**
 * cookie的删除
 * 接收不定长参数removeCookie('name','age','sex');
 * 返回一个被删除的对象
 */
var removeCookie = function(){
    var date = new Date();
    date.setDate(date.getDate()-1);
    var obj = {};
    for(var key in arguments){
        document.cookie = arguments[key]+'='+getCookie(arguments[key])+'; expires='+date.toUTCString();
        obj[arguments[key]] = getCookie(arguments[key]);
    }
    return obj;
}

var getLocalInfo = function(key){
    return localStorage.getItem(key)|| getCookie(key);
}
var removeLocalInfo = function(key){
    localStorage.removeItem(key);
}
var save = function(key,val){
    if(localStorage){
        localStorage.setItem(key,val);
    }else if(document.cookie){
        setCookie(key,val);
    }else{
        alert('您的浏览器已经落后，请更换浏览器,来获取更佳体现');
    }
}