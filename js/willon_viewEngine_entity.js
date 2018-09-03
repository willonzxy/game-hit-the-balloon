/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2017-10-25 14:56:54 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2018-06-11 12:23:40
 */
/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2017-10-18 14:14:12 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2017-10-25 14:43:19
 * 
 * 介绍
 *      视图模板引擎的封装
 * 使用
 *      使用命令模式来使用 
 *      viewCommand({
 *          command:'display',
 *          param:[dom,objArr,'tplName']     试图显示位置（obj），对象数组[object Array]||[object]，使用的模板名称（String）
 *      })
 */
var viewCommand = (function(msg){
     var html  = '';                          //模板字符拼接缓冲区
     var tpl = {                              //模板集合
         questionView:[
            "<div class='head white'>题目<span id='now'>{#index#}</span><span>/{#all#}</span></div>",
            "<div class='questionList'>",
                "<p class='white'><span>问题：</span>",
                    "{#queContent#}",
                "</p>",
            "</div>"
         ].join(''),
         answerListView:[
            "<li><a href='javascript:void(0)' class='white' data-index='{#index#}'>{#text#}</a></li>"
         ].join(''),
         errorView:[
             "{#rightAnswer#}"
         ].join(''),
         rankView:[
            "<tr>",
                "<td>{#rank_num#}</td>",
                "<td>{#name#}</td#>",
                "<td>{#collegeClass#}</td>",
                "<td>{#score#}</td>",
            "</tr>"
         ].join(''),
         myGradeView:[
            "<tr>",
                "<td>{#firstScore#}</td>",
                "<td>{#secondScore#}</td>",
                "<td>{#sum#}</td>",
            "</tr>"
         ].join(''),
     };
     function formateString(str,obj){         
         return str.replace(/\{#(\w+)#\}/g,function(match,key){
            return obj[key];
         })
     }
     var Action = {                            //方法集合
         create : function(data,view){         //批量格式化字符串
            if(data.length){
                for(var i=0,len=data.length;i<len;i++){
                    html+=formateString(tpl[view],data[i]);
                }
            }else{
                html+=formateString(tpl[view],data); //直接格式化字符串缓存到html 中
            }
         },
         display : function(container,data,view){
             if(data){
                 this.create(data,view);//根据数据先格式化字符串后马上传入html 缓冲区 以便一会使用
             }
             if(typeof container !='object'){
                 throw new Error('第一个参数的类型应该为obj string')
             }else{
                 container.innerHTML = ''; 
                 container.innerHTML = html;
                 html = '';                 
             }
         }
     }
     return function excute(msg){                 //向外暴露一个命令接口，总指挥作用
        msg.param = Object.prototype.toString.call(msg.param) === '[object Array]'? msg.param:[msg.param];
        Action[msg.command].apply(Action,msg.param);
    }  
})();


 
