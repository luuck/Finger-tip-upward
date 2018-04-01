window.onload = function () {
    // 禁止默认滑动事件
    document.body.addEventListener('touchmove', function (event) {
        event = event ? event : window.event;
        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
    });

    var pages = function (obj) {
        var box = document.getElementById(obj.wrap),
            box2 = document.getElementById(obj.wrap2),
            len = obj.len,
            n = obj.n,
            startY, moveY, cliH,
            getH = function () {
                cliH = document.body.clientHeight;
            };// 获取屏幕高度
        getH();
        window.addEventListener('resize', getH, false);
        var touchstart = function (event) { // touchStart
            if (!event.touches.length) {
                return;
            }
            startY = event.touches[0].pageY;
            moveY = 0;
        };
        var touchmove = function (event) { // touchMove
            if (!event.touches.length) {
                return;
            }
            moveY = event.touches[0].pageY - startY;
            box2.style.transform = 'translateY(' + (-n * cliH + moveY) + 'px)'; // 根据手指的位置移动页面
        }
        var touchend = function (event) { // touchEnd
            // 位移小于+-50的不翻页
            if (moveY < -50) n++;
            if (moveY > 50) n--;
            // 最后&最前页控制
            if (n < 0) n = 0;
            if (n > len - 1) n = len - 1;
            // 重定位
            box2.style.transform = 'translateY('+(-n*10)+'%)'; // 根据百分百位置移动页面
        }
        // touch事件绑定
        box.addEventListener('touchstart', function(event){touchstart(event);}, false);
        box.addEventListener('touchmove', function(event){touchmove(event);}, false);
        box.addEventListener('touchend', function(event){touchend(event);}, false);
    };

    pages({
        wrap: 'wrap', // wrap的id
        wrap2: 'wrap2', // wrap2的id
        len: 6, // 一共有几页
        n: 0 // 页面打开默认在第几页，第一页就是0，第二页就是1
    });
};