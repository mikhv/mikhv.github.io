window.onload = function() {
  fetch("/data.json", {method: "GET"})
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    let currentPageID = sessionStorage.getItem('currentPageID') == undefined ? 0 : sessionStorage.getItem('currentPageID');
    const navSectionClassList = ['nav-section', 'nav-section-title', 'nav-section-list', 'nav-section-list-item'];

    createPage(document.querySelector('.page'), ['page-title', 'open-in-new-tab-button', 'page-iframe']);
    showPage(document.querySelector('.page-title'), document.querySelector('.open-in-new-tab-button'), document.querySelector('.page-iframe'), json[Object.keys(json)[1]][currentPageID].title, json[Object.keys(json)[1]][currentPageID].link + 'index.html');
    localStorage.setItem('currentPageID', currentPageID);

    createNavSections(document.querySelector('.nav-section-wrapper'), json[Object.keys(json)[0]], navSectionClassList);
    fillNavSections(document.querySelectorAll('.nav-section-list'), json[Object.keys(json)[1]], navSectionClassList);

    contentLoaded = true;
  }).catch(function(ex) {
    showErrorMessage(document.querySelector('.page'), 'error-message', '(!) ' + ex);
  });
}

function showErrorMessage(parentElem, elemClass, message) {
  let p = document.createElement('p');
  p.classList.add(elemClass);
  p.innerHTML = message;
  parentElem.insertAdjacentElement('afterbegin', p);
}

function createPage(parentElem, classList) {
  let pageTitle = document.createElement('p');
  pageTitle.classList.add(classList[0]);
  let openInNewTabButton = document.createElement('a');
  openInNewTabButton.classList.add(classList[1]);
  openInNewTabButton.innerHTML = 'Open in new tab';
  let pageIframe = document.createElement('iframe');
  pageIframe.classList.add(classList[2]);

  parentElem.appendChild(pageTitle);
  parentElem.appendChild(openInNewTabButton);
  parentElem.appendChild(pageIframe);
}

function showPage(titleElem, openInNewTabButton, iframeElem, title, link) {
  titleElem.innerHTML = title;
  openInNewTabButton.href = link;
  iframeElem.src = link;

  // iframeElem.style.height = iframeElem.contentWindow.document.body.scrollHeight + 'px';
}

function createNavSections(parentNavElem, data, classList) {
  for (let i = 0; i < data.length; i++) {
    let navSection = document.createElement('div');
    navSection.classList.add(classList[0]);
    let navSectionTitle = document.createElement('p');
    navSectionTitle.classList.add(classList[1]);
    let navSectionList = document.createElement('ol');
    navSectionList.classList.add(classList[2]);

    parentNavElem.appendChild(navSection);
    navSection.appendChild(navSectionTitle);
    navSection.appendChild(navSectionList);

    navSectionTitle.innerHTML = data[i][Object.keys(data[i])[0]];
  }
}

function fillNavSections(parentNavSectionlist, data, classList) {
  for (let i = 0; i < data.length; i++) {
    let navSectionListItem = document.createElement('li');
    navSectionListItem.classList.add(classList[3]);
    parentNavSectionlist[Number(data[i][Object.keys(data[i])[0]])].appendChild(navSectionListItem);

    navSectionListItem.innerHTML = data[i][Object.keys(data[i])[2]]; // or '<a href="">' + data[i][Object.keys(data[i])[2]] + '</a>'

    navSectionListItem.addEventListener('click', function() {
      showPage(document.querySelector('.page-title'), document.querySelector('.open-in-new-tab-button'), document.querySelector('.page-iframe'), data[i].title, data[i].link + 'index.html');

      sessionStorage.setItem('currentPageID', i);

    });
  }
}