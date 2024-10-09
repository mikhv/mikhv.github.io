// window.location.replace('blocked.html');
// window.location.assign('blocked.html');

let pageStatus = 0; // 0 - ok; 1 - loading; -1 - have errors.

window.onload = function() {
    showLoadingOverlay(document.querySelector('#loading'), document.querySelector('#wrapper'));

    fetch("/data.json", {method: "GET"})
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        let currentPageID = sessionStorage.getItem('currentPageID') == undefined ? 0 : sessionStorage.getItem('currentPageID');
        let currentPageTitle = json[Object.keys(json)[1]][currentPageID].title;
        let currentPageLink = json[Object.keys(json)[1]][currentPageID].link + 'index.html';

        createPage(document.querySelector('#page'), ['pageTitle', 'pageContent']);
        showPage(document.querySelector('#pageTitle'), document.querySelector('#pageContent'), currentPageTitle, currentPageLink);
        // showPage(document.querySelector('#pageTitle'), document.querySelector('#pageContent'), 'Test page', 'pages/test/index.html');

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
            contentElem.style.display = 'block';
            clearInterval(pageLoadingInterval);
        }
    }, intervalValue);
}

function createPage(pageElem, idList) {
    let pageTitle = document.createElement('p');
    pageTitle.id = idList[0];
    let pageContent = document.createElement('div');
    pageContent.id = idList[1];

    pageElem.appendChild(pageTitle);
    pageElem.appendChild(pageContent);
}

function showPage(titleElem, contentElem, title, link) {
    titleElem.innerHTML = title;

    fetch(link, {method: "GET"})
    .then((res) => {
        res.text().then((text) => {
            contentElem.innerHTML = text;
        });
    });
}