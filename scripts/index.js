const pagePathElem = document.getElementById('pagePath');
const pageTitleElem = document.getElementById('pageTitle');
const iframe = document.getElementById('iframe');

fetch("https://mikhv.github.io/data.json", {method: "GET"}) // '/data.json'
.then(function(response) {
  return response.json();
}).then(function(json) {
  console.log('parsed json', json)


}).catch(function(ex) {
  console.log('parsing failed', ex)
});

function fillNavMenu() {

}

function openPage() {

}