function checkLockStatus() {
    let isLocked = sessionStorage.getItem('isLocked') === null || sessionStorage.getItem('isLocked') === undefined ? 'y' : sessionStorage.getItem('isLocked');

    if (isLocked == 'y') {
        // :D
        window.location.replace('lockdown.html');
        window.location.assign('lockdown.html');
    } else {
        sessionStorage.setItem('isLocked', 'y')

    }
}
checkLockStatus();

let pageStatus = 1; // 0 - ok; 1 - loading; -1 - have errors.

window.onload = function() {


    const loadingElem = document.querySelector('#loading');
    const wrapperElem = document.querySelector('#wrapper');

    showLoadingOverlay(loadingElem, wrapperElem);

    let currentPageID = sessionStorage.getItem('currentPageID') == undefined ? 0 : sessionStorage.getItem('currentPageID');
    const pageElem = document.querySelector('#content');

    fetch("https://mikhv.github.io/data.json", {method: "GET"}) // "data.json"
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        // createPage(pageElem, ['pageTitle', 'openInNewTabButton', 'pageIframe']);
        // showPage(document.querySelector('#pageTitle'), document.querySelector('#openInNewTabButton'), document.querySelector('#pageIframe'), json[Object.keys(json)[1]][currentPageID].title, json[Object.keys(json)[1]][currentPageID].link + 'index.html');
        // showPage(document.querySelector('#pageTitle'), document.querySelector('#openInNewTabButton'), document.querySelector('#pageIframe'), 'Test page', 'pages/test/index.html');

        pageStatus = 0;
    }).catch(function(ex) {
        pageStatus = -1;
        // showErrorMessage();
        console.log(ex)
    });
}

function showLoadingOverlay(overlayElem, contentElem) {
    const intervalValue = 50;
    const pageLoadingInterval = setInterval(function() {
        if (pageStatus == 1) {
            // showLoadingBlock();
        } else if (pageStatus == -1) {
            // showRefreshBlock();
        } else {
            overlayElem.style.display = 'none';
            contentElem.style.display = 'flex';
            clearInterval(pageLoadingInterval);
        }
    }, intervalValue);
}

function createPage(pageElem, idList) {
    let pageTitle = document.createElement('p');
    pageTitle.id = idList[0];
    let openInNewTabButton = document.createElement('a');
    openInNewTabButton.id = idList[1];
    openInNewTabButton.innerHTML = 'Open in new tab';
    let pageIframe = document.createElement('iframe');
    pageIframe.id = idList[2];
    pageIframe.setAttribute('frameborder', 0);
    pageIframe.setAttribute('scrolling', 'no');

    pageElem.appendChild(pageTitle);
    pageElem.appendChild(openInNewTabButton);
    pageElem.appendChild(pageIframe);
}

function showPage(titleElem, openInNewTabButtonElem, iframeElem, title, link) {
    titleElem.innerHTML = title;
    openInNewTabButtonElem.href = link;
    iframeElem.src = link;

    iframeElem.onload = function() {
        let postMessageListener = iframeElem.addEventListener('message', (event) => {
            let eventName = event.data[0];
            let data = event.data[1];
            if (eventName == 'iframeContentHeight') {
                fixIframeHeight(data);
                window.addEventListener('resize', function() {
                    fixIframeHeight(data);
                });

                removeEventListener('message', postMessageListener, false);
            }
        }, false);
    }
}

function fixIframeHeight(height) {
    console.log('hi')
    const wrapperElem = document.querySelector('#wrapper');
    const iframeElem = document.querySelector('#pageIframe');

    wrapperElemHeight = wrapperElem.scrollHeight;
    iframeElemHeight = iframeElem.scrollHeight;

    if (height > wrapperElemHeight - iframeElemHeight) {
        wrapperElem.style.height = wrapperElemHeight - iframeElemHeight + height + 'px';
    } else {

    }
}