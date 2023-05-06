// 获取url内参数
function queryURLParams(url) {
    let pattern = /(\w+)=(\w+)/ig; //定义正则表达式
    let params = {}; // 定义参数对象
    url.replace(pattern, ($, $1, $2) => {
        params[$1] = $2;
    });
    return params;
}

// 图片懒加载
function lazyLoad(imgs) {
    var H = document.documentElement.clientHeight;//获取可视区域高度
    var S = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(`H: ${H}, S: ${S}, H+S: ${H+S}, `);
    for (var i = 0; i < imgs.length; i++) {
        console.log(`i: ${i}, getTop(imgs[i]): ${getTop(imgs[i])}`);
        if (H + S > getTop(imgs[i])) {
            imgs[i].src = imgs[i].getAttribute('data-src');
        }
    }
}

// 图片懒加载的判断
// offsetTop是元素与offsetParent的距离，循环获取直到页面顶部
function getTop(e) {
    var T = e.offsetTop;
    while(e = e.offsetParent) {
        T += e.offsetTop;
    }
    return T;
}

