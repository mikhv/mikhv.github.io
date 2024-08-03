let requestURL = "https://mikhv.github.io/data.json";
let request =  new XMLHttpRequest();

request.open("GET", requestURL);

requestAnimationFrame.responseType = "json";
request.send();

let jsonObj;
request.onload = function() {
    jsonObj = request.response;
}

console.log(jsonObj);