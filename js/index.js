//��תľ��js
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



//����id��ȡ��Ӧ��Ԫ��
function my$(id) {
    return document.getElementById(id);
}
/*
 * element---�����Ԫ��
 * attr---����
 * */
function getAttrValue(element,attr) {
    return element.currentStyle?element.currentStyle[attr] : window.getComputedStyle(element,null)[attr]||0;
}

/*
 * element----Ҫ�ƶ���Ԫ��
 * target----�ƶ���Ŀ��
 * �����汾
 * */
/*
 * �ռ��汾�Ķ�������---��bug
 *
 * */
function animate(element,json,fn) {
    clearInterval(element.timeId);
    element.timeId=setInterval(function () {
        var flag=true;//���趼�ﵽ��Ŀ��
        for(var attr in json){
            if(attr=="opacity"){//�ж������ǲ���opacity
                var current= getAttrValue(element,attr)*100;
                //ÿ���ƶ����ٲ�
                var target=json[attr]*100;//ֱ�Ӹ�ֵ��һ������,����Ĵ��붼���ø�
                var step=(target-current)/10;//(Ŀ��-��ǰ)/10
                step=step>0?Math.ceil(step):Math.floor(step);
                current=current+step;
                element.style[attr]=current/100;
            }else if(attr=="zIndex"){//�ж������ǲ���zIndex
                element.style[attr]=json[attr];
            }else{//��ͨ������

                //��ȡ��ǰ��λ��----getAttrValue(element,attr)��ȡ�����ַ�������
                var current= parseInt(getAttrValue(element,attr))||0;
                //ÿ���ƶ����ٲ�
                var target=json[attr];//ֱ�Ӹ�ֵ��һ������,����Ĵ��붼���ø�
                var step=(target-current)/10;//(Ŀ��-��ǰ)/10
                step=step>0?Math.ceil(step):Math.floor(step);
                current=current+step;
                element.style[attr]=current+"px";
            }
            if(current!=target){
                flag=false;//���û��Ŀ������Ϊfalse
            }
        }
        if(flag){//���Ϊtrue
            clearInterval(element.timeId);
            if(fn){//����û������˻ص��ĺ���
                fn(); //��ֱ�ӵĵ���,
            }
        }
        console.log("target:"+target+"current:"+current+"step:"+step);
    },10);
}
//��תľ��js