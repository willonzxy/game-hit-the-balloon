/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2017-11-12 21:59:23 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2018-03-25 16:54:15
 */

 /**
  * 控制气球的活动
  * 1、初始化气球
  * 2、事件委托监听点击事件
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

        var num = 4,
        balls = [],
        gamePanel = $('#gamePanel')[0],
        time = $('#time')[0],
        grade = $('#grade')[0],
        annimation = '';
      
      for(var i = num ;i-- ;){
        balls.push(new Balloon());
      }
      
      /**
       * 初始化气球
       */
      if(!annimation){
          (function run(){
            gamePanel.innerHTML = '';  //刷新容器，重新添加，dom元素，
            balls.forEach(function(balloon){
              balloon.init();                        //因为是对象是传值方式是引用，且每个dom的新属性都是由对象的引用获取的，就实现了对象与气球的关联，故可以通过循环遍历来，刷新每一个气球的位置与状态
            });
            window.cancelAnimationFrame(annimation);
            annimation = window.requestAnimationFrame(run);
        })();
      }else{
        window.cancelAnimationFrame(annimation);
      }
      // reCall();
      // function reCall(){
      //   gamePanel.innerHTML = '';
      //   balls.forEach(function(balloon){
      //     balloon.init();
      //   });
      //   clearTimeout(annimation);
      //   annimation = setTimeout(arguments.callee,1000/60);//arguments.callee 等于reCall函数
      // }
      
      /**
       * 事件委托，触发爆炸事件
       */
      $('body').on('click','i',function(){
        this.boom();
        if(this.canTouch){   //以免用户恶意点击
          grader.grade += 10;
        }
        grade.innerHTML = grader.grade;
      });
      
      /**
       * 开启定时器
       */
      new Countdown(time).init(function(control){
        // clearInterval(annimation);
        window.cancelAnimationFrame(annimation);
        control.gameover({
          clear:gamePanel,
          submiter : grader,
          alert : '时间已到\n同志您本关获得的分数是：'
        });
      });
      
      /**
       * 打开积分牌,传入积分位置
       */
      var grader = new Grade(grade);
  }
}
browserRedirect();