function resize() {
    let htmlHeight = document.querySelector('html').scrollHeight;
    window.parent.postMessage(['iframeContentHeight', htmlHeight], '*');
}