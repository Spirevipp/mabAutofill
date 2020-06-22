var loadJS = function (url, implementationCode, location) {
    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};
var runMabScript = function () {
    mabAutofill();
}
loadJS('https://spirevipp.github.io/mabAutofill/mabAutofill.js', runMabScript, document.body);