/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2017-11-10 18:25:57 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2017-11-14 17:58:35
 */
/**
 * 1、getDate();
 * 2、getCache();
 * 3、pre;
 * 4、next;
 * 5、changeView;
 * 6、submit;
 * 7、openWindow
 *
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
        return false;
        // return true;
    }else{
        return true;
    }
}
if(!browserRedirect()){
    window.location.href = './404.html';
}else{
    (function(){
        /**
         * 答题程序控制单体
         */
        var contorller = (function(){

            var _nowQue = 0, //当前题号
                _data = '', //题目缓存所有数据
                _grade = 0;//记录当前分数

            const URL = {
                PROJECTNAME:'/nineteen',
                GETQUESTION:'/question/list',
                SENDGRADE:'/prePass',
                FINALLY:'./grade.html'
            };

            return {
                setData:function(){
                    $.get(URL.PROJECTNAME+URL.GETQUESTION+'?number=8',function(res){
                        /**
                         * 数据转换
                         *保存数据
                         */
                        var data = [],
                            engIndex = ['D','C','B','A'];
                        res.forEach(function(val,index,arr){
                            var obj = {};
                            obj.answerList = [];
                            obj.all = arr.length;
                            obj.queContent = val.qcontent;
                            obj.rightAnswer = val.answer.toUpperCase();
                            obj.index = index+1;
                            (function () {
                                for(var i = 4;i--;){
                                    obj.answerList.push(
                                        {index:engIndex[i],text:val[engIndex[i].toLowerCase()].trim()}
                                    );
                                }
                            })();
                            data.push(obj);
                        });
                        _data = data;
                        console.log(_data);
                        contorller.render.call(contorller,oQuestionView,oUlView);
                    });
                },
                render:function(dom,dom1){
                    /**
                     * 1、拿到当前关卡的数据
                     * 2、渲染
                     */
                    var textData = _data[_nowQue],
                        answerListData = textData.answerList;
                    viewCommand({
                        command:'display',
                        param:[dom,textData,'questionView']
                    });
                    viewCommand({
                        command:'display',
                        param:[dom1,answerListData,'answerListView']
                    });
                },
                errorTips:function(dom){
                    var textData = _data[_nowQue];
                    textData.answerList.forEach(function(element){
                        if(element.index == textData.rightAnswer){
                            dom.innerHTML = element.index+':'+element.text;
                            $(".alert").show();
                        }
                    });

                    var timer = setTimeout(function() {
                        $(".alert").fadeOut();
                        this.next();
                        clearTimeout(timer);
                    }.bind(contorller), 1500);
                },
                rightTips:function(){
                    _grade++;
                    $('.grade').append('<div class="tick"></div>');
                },
                next:function(){
                    /**
                     * 1、进入下一题,
                     * 2、渲染下一题页面
                     */
                    _nowQue++;
                    console.log(_data[0].all);
                    if(_nowQue>=_data[0].all){
                        /**
                         * 全部答完之后
                         * 跳转页面
                         */
                        $(".alert").fadeOut();
                        contorller.sendAnswer();

                    }else{
                        /**
                         * 还没答完将继续渲染页面
                         */
                        contorller.render.call(contorller,oQuestionView,oUlView);
                    }
                },
                commit:function(answer){
                    if(_data[_nowQue].rightAnswer === answer){
                        return true;
                    }else{
                        return false;
                    }
                },
                sendAnswer:function(){
                    $.get(URL.PROJECTNAME+URL.SENDGRADE+'?score='+(_grade*20),function(res){
                        if(res){
                            console.log('submited');
                            //this.openNewWindow();
                            window.location.href = URL.FINALLY+'?grade='+decodeURI(_grade);
                        }else{
                            alert('抱歉！本题答案提交失败');
                        }
                    });
                },
            }
        })();

        /**
         * 控制逻辑
         */
        var oUlView = $('#answerList')[0],
            oQuestionView = $('#question')[0];
        /**
         * 事件委托
         */
        $(oUlView).on('click','a',function(){
            var answer = $(this).attr('data-index');
            console.log(answer);
            if(!contorller.commit(answer)){
                contorller.errorTips($('#rightAnswer')[0]);
            }else{
                contorller.rightTips();
                contorller.next();
            };
        });
        /**
         * 初始化数据及渲染
         */
        contorller.setData();

    })();

}
 