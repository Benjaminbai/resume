//旋转木马，js
var config = [
    {
        width: 400,
        top: 20,
        left: 50,
        opacity: 0.2,
        zIndex: 2
    },//0
    {
        width: 600,
        top: 70,
        left: 0,
        opacity: 0.8,
        zIndex: 3
    },//1
    {
        width: 800,
        top: 100,
        left: 200,
        opacity: 1,
        zIndex: 4
    },//2
    {
        width: 600,
        top: 70,
        left: 600,
        opacity: 0.8,
        zIndex: 3
    },//3
    {
        width: 400,
        top: 20,
        left: 750,
        opacity: 0.2,
        zIndex: 2
    }//4

];
var wrap = my$("wrap");
var slide = my$("slide");
var uu = slide.children[0];
var list = uu.children;
var arrow = my$("arrow");
var left = my$("arrLeft");
var right = my$("arrRight");
var flag = true;

function assign() {
    for (var i = 0; i < list.length; i++) {
        animate(list[i], config[i], function () {
            flag = true;
        });
    }
}
assign();
right.onclick = function () {
    if (flag) {
        flag = false;
        config.push(config.shift());
        assign();
    }

};
left.onclick = function () {
    if (flag) {
        flag = false;
        config.unshift(config.pop());
        assign();
    }

};


wrap.onmouseover = function () {
    animate(arrow, {"opacity": 1});
};
wrap.onmouseout = function () {
    animate(arrow, {"opacity": 0});
};



//根据id获取对应的元素
function my$(id) {
    return document.getElementById(id);
}
/*
 * element---任意的元素
 * attr---属性
 * */
function getAttrValue(element,attr) {
    return element.currentStyle?element.currentStyle[attr] : window.getComputedStyle(element,null)[attr]||0;
}

/*
 * element----要移动的元素
 * target----移动的目标
 * 初级版本
 * */
/*
 * 终极版本的动画函数---有bug
 *
 * */
function animate(element,json,fn) {
    clearInterval(element.timeId);
    element.timeId=setInterval(function () {
        var flag=true;//假设都达到了目标
        for(var attr in json){
            if(attr=="opacity"){//判断属性是不是opacity
                var current= getAttrValue(element,attr)*100;
                //每次移动多少步
                var target=json[attr]*100;//直接赋值给一个变量,后面的代码都不用改
                var step=(target-current)/10;//(目标-当前)/10
                step=step>0?Math.ceil(step):Math.floor(step);
                current=current+step;
                element.style[attr]=current/100;
            }else if(attr=="zIndex"){//判断属性是不是zIndex
                element.style[attr]=json[attr];
            }else{//普通的属性

                //获取当前的位置----getAttrValue(element,attr)获取的是字符串类型
                var current= parseInt(getAttrValue(element,attr))||0;
                //每次移动多少步
                var target=json[attr];//直接赋值给一个变量,后面的代码都不用改
                var step=(target-current)/10;//(目标-当前)/10
                step=step>0?Math.ceil(step):Math.floor(step);
                current=current+step;
                element.style[attr]=current+"px";
            }
            if(current!=target){
                flag=false;//如果没到目标结果就为false
            }
        }
        if(flag){//结果为true
            clearInterval(element.timeId);
            if(fn){//如果用户传入了回调的函数
                fn(); //就直接的调用,
            }
        }
        console.log("target:"+target+"current:"+current+"step:"+step);
    },10);
}
//旋转木马，js