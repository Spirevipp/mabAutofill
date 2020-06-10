// forandre script håndtering til å bli lastet inn fra github source, deretter kjørt
// gjør det enklere å oppdatere script, og slipper et script på flere hundre ord som en bookmarklet

// pseudo kode

/*

mabAutofillScript = httpget https://raw.githubusercontent.com/Spirevipp/mabAutofill/master/3c%20autofill.js
set mabAutofillScript as javascript sourcefile
runscript()
*/

var loadJS = function (url, implementationCode, location) {
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to 
    //insert the <script> element

    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};
var runMabScript = function () {
    //your code goes here
    mabAutofill();
    //alert("hello world!");
}
loadJS('https://cdn.jsdelivr.net/gh/Spirevipp/mabAutofill@master/mabAutofill.js', runMabScript, document.body);