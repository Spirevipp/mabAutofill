var loadJS = function (url, implementationCode, location) {
    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};
var run3C = function () {
    mabAutofill();
}
var runeXchange = function () {
    mabAutofill();
}
var runLogiq = function () {
    mabAutofill();
}
var currentURL = document.URL;
if (currentURL != "https://spirevipp.github.io/mabAutofill/") {

    if (currentURL == "https://exchange.serviceinfo.se/store_reg_neworder.asp") {
        loadJS('https://spirevipp.github.io/mabAutofill/eXchange.js', runeXchange, document.body);
    } else if (currentURL == "https://3cgui.sony.eu/serviceportal/#/create-service-event-2") {
        loadJS('https://spirevipp.github.io/mabAutofill/3C.js', run3C, document.body)
    } else if (currentURL == "https://logiqrma.com/ombytte/Main?act=pre&tpl=pre&prm=newpreq&job=reg&typ=mrk#") {
        loadJS('https://spirevipp.github.io/mabAutofill/logiq.js', runLogiq, document.body)
    } else {
        alert("Ugyldig nettside, funker kun i 3cgui service registrering, logiq registrering eller eXchange registrering");
    }
} else {
    console.log("Abort!");
}