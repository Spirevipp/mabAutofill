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
var currURL = document.URL;
if (currURL == "https://exchange.serviceinfo.se/store_reg_neworder.asp" || currURL == "https://3cgui.sony.eu/serviceportal/#/create-service-event-2") {
    loadJS('https://spirevipp.github.io/mabAutofill/mabAutofill.js', runMabScript, document.body);
}
else{console.log("Abort!");}
