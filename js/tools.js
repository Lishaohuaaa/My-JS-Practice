//定义一个变量，用来保存定时器的标识
/**
 * 目前我们的定时器的标识有全局变量timer保存，
 *   所有正在执行的计时器都在这个变量中
 */
// var timer;

//尝试创建一个可以执行简单动画的函数
/**
 * 参数：
 *   obj:要执行动画的对象
 *   attr:要执行动画的样式，比如:left top right height
 *   target:执行动画的目标位置
 *   speed:移动的速度， (×正值向右移，负值向左移)  不分正负，只传正值
 *      如果分正负的话，不知道box1在哪里的情况下，不知道应该向左还是向右，所以传正负不合理
 *   callback:回调函数，这个函数将会在动画执行完毕后执行
 *   
 */
function move(obj, attr, target, speed, callback) {

    clearInterval(obj.timer);

    //获取元素目前的位置
    var current = parseInt(getStyle(obj, attr));

    //判断速度的正负值
    //如果从0向800移动，则speed为正
    //如果从800向0移动
    if (current > target) {
        //此时速度应为负值
        speed = -speed;
    }

    obj.timer = setInterval(function () {
        // box1.style.left = box1.offsetLeft + 5 + "px";

        //获取box1的原来的left值
        //parseInt()  把一个字符串中的合法数字取出来
        var oldValue = parseInt(getStyle(obj, attr));

        //在旧值得基础上增加
        var newValue = oldValue + speed;

        //判断向左移还是向右移
        //向左移动时，判断newValue是否小于target
        //向右移动时，判断newValue是否大于target
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target;
        };
        //将新值设置给box1
        obj.style[attr] = newValue + "px";

        //当元素移动到800px时，使其停止运行动画
        if (newValue === target) {
            clearInterval(obj.timer);
            //动画执行完毕，调用回调函数
            callback && callback();
        };
    }, 30);
};

/**
 * 定义一个函数，用来获取指定元素的当前的样式
 * 参数：
 *      obj  要获取样式的元素
 *      name 要获取的样式名
 */
function getStyle(obj, name) {

    //不加window，全局差找不到getComputedStyle，则会报错，则IE8差找不到，会报错而不是执行else
    //加上window属性，在window中找不到getComputedStyle，会返回undefined
    return window.getComputedStyle ? getComputedStyle(obj, null)[name] : obj.currentStyle[name];
};

//定义一个函数，用来向一个元素中添加指定的class属性值
/**
 * 参数：
 *   obj：要添加class属性的元素
 *   cn：要添加的class值
 */
function addClass(obj, cn) {

    //检查obj中是否含有cn
    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    };
};

/**
 * 判断一个元素中是否含有指定的class
 *   如果有该class，则返回true，否则返回false
 */
function hasClass(obj, cn) {
    //判断obj中有没有cn class
    //创建一个正则表达式
    //   \b 单词边界
    // var reg = /\bb2\b/;
    var reg = new RegExp("\\b" + cn + "\\b");
    // alert(reg);
    return reg.test(obj.className);

};

/**
 * 删除一个元素中的指定的class属性
 */
function removeClass(obj, cn) {
    var reg = new RegExp("\\b" + cn + "\\b");
    obj.className = obj.className.replace(reg, "");
}

/**
 * toggleClass可以用来切换一个类
 *   如果元素中具有该类，则删除
 *   如果元素中没有该类，则添加
 */
function toggleClass(obj, cn) {
    if (hasClass(obj, cn)) {
        removeClass(obj, cn);
    } else {
        addClass(obj, cn);
    };
};