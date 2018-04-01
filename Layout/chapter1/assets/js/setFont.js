(function () {
    if (!window.addEventListener) return;
    var html = document.documentElement;

    function setfont() {
        var cliWidth = html.clientWidth;
        html.style.fontSize = 100 * (cliWidth / 640) + 'px';
    }

    document.addEventListener('DOMContentLoaded', setfont, false);
})();