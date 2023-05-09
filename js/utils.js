// 获取url内参数
function queryURLParams(url) {
    let pattern = /(\w+)=([\w-_]+)/ig; //定义正则表达式
    let params = {}; // 定义参数对象
    url.replace(pattern, ($, $1, $2) => {
        params[$1] = $2;
    });
    return params;
}

// 插入数据
function insertDataHtml(page, dataSource) {
    var col1 = document.querySelector('#faxian-col1');
    var col2 = document.querySelector('#faxian-col2');
    col1.innerHTML = "";
    col2.innerHTML = "";
    var dataList = Object.keys(dataSource);
    //动态插入数据
    for (var i = 0; i < dataList.length; i++) {
        var name = dataList[i];
        if (name && name.indexOf("kong") === -1) {
            var section = document.createElement('section');
            var link = document.createElement('a');
            var image = document.createElement('img');
            section.id = name;
            section.classList.add('eds-note-card');
            section.classList.add('note-card');
            image.dataset.src = "./images/content/" + (dataSource[name].imageUrl || name) + "/" + (dataSource[name].imageUrl || name.replace('article-', '').replace('video-', '')) + ".png";
            image.style.width = "100%";
            image.style.minHeight = "150px";
            if (name.indexOf('video-') > -1) {
                link.href = "./video.html?from=" + page + "&id=" + name;
            } else if (name.indexOf('article-') > -1) {
                link.href = "./normal.html?from=" + page + "&id=" + name;
            }
            link.appendChild(image);
            section.appendChild(link);
            console.log('dataSource[name].col');
            console.log(dataSource[name].col);
            if  (dataSource[name].col) {
                
                if (dataSource[name].col === 'col1') {
                    col1.appendChild(section);
                } else {
                    col2.appendChild(section);
                }
            } else {
                if (i % 2 === 0) {
                    col1.appendChild(section);
                } else {
                    col2.appendChild(section);
                }
            }
        }
    };
}

// 图片懒加载
function lazyLoad(imgs) {
    var H = document.documentElement.clientHeight;//获取可视区域高度
    var S = document.documentElement.scrollTop || document.body.scrollTop;
    for (var i = 0; i < imgs.length; i++) {
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

