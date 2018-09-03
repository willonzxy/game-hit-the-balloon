/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2017-11-12 18:20:58 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2018-06-11 12:21:46
 */
/**
 * OOP打气球小游戏
 * 思路
 * 1、获取视窗大小
 * 2、生成气球，开始计时
 * 3、运动
 * 4、点击
 * 5、消失
 * 6、记录分数
 * 7、结束游戏
 * 8、上传分数
 */
    /**
     * 兼容原生关键帧动画
     */
    var vendors = ['ms', 'moz', 'webkit', 'o'];    
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {    
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];    
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];    
    }
    /**
     * 1、获取视窗大小
     */
    var win = {
        width:window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height:window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
    
    /**
     * 2、气球类
     */
    var Balloon = function(){
        var that = this;
        // that.width = ''win.width*0.15;''
        that.width = win.width*0.25 + (Math.random()*20);
        that.height = that.width;
        that.className = 'balloon';
        that.top = win.height - that.width;//初始化高度
        that.left = randomLeft.call(that);//随机横向位置
        that.speed = ~~(Math.random()*8)+2;//随机速度
        that.dom = null;
    }

    /**
     * 消失后初始化气球属性
     */
    Balloon.prototype.update = function(){
        var that = this;
        // that.width = ''win.width*0.15;''
        that.width = Math.random()*win.width*0.25+win.width*0.12;
        that.height =  that.width;
        that.className = 'balloon';
        that.top = win.height - that.width;//初始化高度
        that.left = randomLeft.call(that);//随机横向位置
        that.speed = ~~(Math.random()*8)+2;//随机速度
        that.dom = null;
        that.canTouch = true;   //以免卡帧时用户误点
    }

    /**
     * 气球更新运动
     */
    Balloon.prototype.init = function(){
        var that = this,
            balloon = document.createElement('i');
            balloon.className = 'balloon';
            balloon.speed = that.speed;
            balloon.style.cssText = 'width:'+that.width+'px;height:'+that.height+'px;top:'+that.top+'px;left:'+that.left+'px';
            balloon.boom = function(){
                (function run(){
                    that.canTouch = false;
                    that.speed++;
                    that.width-=5;
                    that.height-=5;
                    var timer = '';
                    if(that.width < 15){
                        that.dom.parent.removeChild(that.dom);
                        console.log('boom');
                        window.cancelAnimationFrame(timer);
                        // that.update();
                    }else{
                        timer = window.requestAnimationFrame(run);
                    }
                    
                })();
            };
            that.dom = balloon;
            that.dom.parent = $('#gamePanel')[0];
            that.dom.parent.appendChild(balloon);
            that.move();
    }

    /**
     * 气球运动
     */
    Balloon.prototype.move = function(){
        this.top -= this.speed; 
        if(this.top < -200){
            this.boom();
        }
    }
    
    /**
     * 气球自动消失/移除
     */
    Balloon.prototype.boom = function(){
        this.speed++;
        this.width-=5;
        this.height-=5;
        if(this.width < 10){
            this.dom?this.dom.parent.removeChild(this.dom):'';
            this.update();
        }
    }
    
    /**
     * 3、计时器类
     */
    var Countdown = function(obj){
        this.overTime = 19000;//30s的一个定时器
        this.hasTime = 19000;//剩余时间
        this.site = obj;//定时器位置
    }

    /**
     * 计时器开始倒数
     */
    Countdown.prototype.init = function(cb){
        var that = this;
        console.log(new Date(that.hasTime).getSeconds());
        var timer = setInterval(function(){
            that.site.innerHTML = new Date(that.hasTime).getSeconds();//计时器位置渲染
            if(that.hasTime<=0){//时间到了，gameover;
                clearInterval(timer);
                cb&&cb(that);  //暴露计时器对象
            }
            that.hasTime -= 1000;//减少当前剩余时间
        },1000);
    }

    /**
     * 游戏时间到了
     * 1、清空游戏界面
     * 2、上传成绩
     * 3、弹窗提示成绩
     * 4、用户确认后就跳转到分数榜
     * 使用 new Countdown.gameover({
     *      clear : dom,
     *      submiter : obj instanceof Grade,
     *      alert : 'string',
     * })
     */
    Countdown.prototype.gameover = function(parm){
        parm.clear?parm.clear.innerHTML = '':'';
        parm.submiter.submit();
        if(confirm(parm.alert+parm.submiter.grade+'分')){
            window.location.href = './race.html';
        }else{
            window.location.href = './race.html';
        }

    }

    /**
     * 4、分数记录/上传者
     */
    var Grade = function(site){
        var URL = {};
        this.grade = 0;
        this.site = site;
        this.url = Object.defineProperty(URL,'url',{
            value : '',//上传路径
            writable : false,
            enumerable : true,
            configurable : false
        });
    }
    /**
     * 分数上传服务器动作
     */
    Grade.prototype.submit = function(){
        $.post(this.url,{'grade':''},function(res){
            if(res){
                //跳转到排行榜的位置
                window.location.href = './race.html';
            }else{
                alert('抱歉！分数提交失败');
            }
        });
    }

    /**
     * 公共随机函数
     * 1、横轴随机
     * 
     */
    function randomLeft(){
        var randomX =  ~~(Math.random()*win.width)-this.width;
            randomX = (randomX<=0)?0:randomX;//约束左边界
        return randomX;
       
    }
