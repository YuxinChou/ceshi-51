// 轮播图片切换下一张
function showNext() {
    // 轮转下标
    left = center;
    center = right;
    right++;
    //　极值判断
    if (right > carouselListLength - 1) {
        right = 0;
    }
    carouselIndex.innerHTML = right + 1 + '/' + carouselListLength;
    //添加过渡（多次使用，封装成函数）
    setTransition(1, 1, 0);
    // 归位
    setTransform();
    // 自动设置小圆点
    setPoint();
}

// 轮播图片切换上一张
function showPrev() {
    // 轮转下标
    right = center;
    center = left;
    left--;
    //　极值判断
    if (left < 0) {
        left = carouselListLength - 1;
    }
    carouselIndex.innerHTML = left + 1 + '/' + carouselListLength;
    //添加过渡
    setTransition(0, 1, 1);
    // 归位
    setTransform();
    // 自动设置小圆点
    setPoint();
}

// 滑动开始
function touchstartHandler(e) {
    // 清除定时器
    // clearInterval(timer);
    // 记录滑动开始的时间
    startTime = Date.now();
    // 记录手指最开始的落点
    startX = e.changedTouches[0].clientX;
    }
    // 滑动持续中
    function touchmoveHandler(e) {
    // 获取差值 自带正负
    var dx = e.changedTouches[0].clientX - startX;
    // 干掉过渡
    setTransition(0, 0, 0);
    // 归位
    setTransform(dx);
}

//　滑动结束
function touchendHandeler(e) {
    // 在手指松开的时候，要判断当前是否滑动成功
    var dx = e.changedTouches[0].clientX - startX;
    // 获取时间差
    var dTime = Date.now() - startTime;
    // 滑动成功的依据是滑动的距离（绝对值）超过屏幕的三分之一 或者滑动的时间小于300毫秒同时滑动的距离大于30
    if (Math.abs(dx) > screenWidth / 3 || (dTime < 300 && Math.abs(dx) > 30)) {
        // 滑动成功了
        // 判断用户是往哪个方向滑
        if (dx > 0) {
        // 往右滑 看到上一张
        showPrev();
        } else {
        // 往左滑 看到下一张
        showNext();
        }
    } else {
        // 添加上过渡
        setTransition(1, 1, 1);
        // 滑动失败了
        setTransform();
    }

    // 重新启动定时器
    // clearInterval(timer);
    // 调用定时器
    // timer = setInterval(showNext, 2000);
}

// 设置过渡
function setTransition(a, b, c) {
    if (a) {
        carouselList[left].style.transition = 'transform 1s';
    } else {
        carouselList[left].style.transition = 'none';
    }
    if (b) {
        carouselList[center].style.transition = 'transform 1s';
    } else {
        carouselList[center].style.transition = 'none';
    }
    if (c) {
        carouselList[right].style.transition = 'transform 1s';
    } else {
        carouselList[right].style.transition = 'none';
    }
}

//　封装归位
function setTransform(dx) {
    dx = dx || 0;
    carouselList[left].style.transform = 'translateX(' + (-screenWidth + dx) + 'px)';
    carouselList[center].style.transform = 'translateX(' + dx + 'px)';
    carouselList[right].style.transform = 'translateX(' + (screenWidth + dx) + 'px)';
}
    