function fiksFormattering(s){
	// bytter ut alle feilformaterte æøå i input string s
	var re = [/Ã¦/g, /Ã¸/g, /Ã¥/g, /Ã†/g, /Ã˜/g, /Ã…/g];
	var rep = ["æ", "ø", "å", "Æ", "Ø", "Å"];
	console.log(s);
	for (var i = 0; i < re.length; i++) {
		//regex match alle formater i re array og bytt ut med bokstav i rep array
		var prevS = s;
		s = s.replace(re[i], rep[i]);
		if (prevS != s) {
			console.log(re[i], rep[i]);
			console.log(s);
		}
	}
	return s;
}

var mabData = JSON.parse(prompt("Lim inn data fra MAB", ""));
console.log(mabData);

// lag en array med array for alle elementer i mabData
var tempObj = Object.entries(mabData);
console.log(tempObj);

// iterer over array og mabdata for å bytte ut feilformaterte æøå
for (i = 0; i < tempObj.length; i++){
	console.log(tempObj[i]);
	mabData[tempObj[i][0]] = fiksFormattering(tempObj[i][1]);
}
console.log(mabData);

// reverser dato rekkefølge
var tmpVar = mabData["dato"];
tmpVar = tmpVar.split(".");
mabData["dato"] = tmpVar[2].concat("/", tmpVar[1], "/", tmpVar[0]);

// Sjekke om enkelte felt er tomme, og fylle ut med placeholder
// Sjekker tlf, adresse, postnr, poststed, epost, serienummer, navn
// navn blir også flyttet og korrigert hvis det er butikk
// serienummer sjekker om det er XXXXXXX, NA, eller tom, og markerer no serial boksen om mulig
// hvis ingen epost blir no email knapp valgt
if (mabData["tlf"] == ""){
	mabData["tlf"] = "99999999";
}
var noEmail = false;
if (mabData["epost"] == ""){
	noEmail = true;
}
if (mabData["adresse"] == ""){
	mabData["adresse"] = ".";
}
if (mabData["postnummer"] == ""){
	mabData["postnummer"] = "0000";
}
if (mabData["poststed"] == ""){
	mabData["poststed"] = "."
}
if (mabData["fornavn"] == "" && mabData["etternavn"] != ""){
	mabData["fornavn"] = mabData["etternavn"];
	mabData["etternavn"] = ".";
}
else if (mabData["fornavn"] == "" && mabData["etternavn"] == ""){	// Skal aldri skje, men why not
	mabData["fornavn"] = ".";
	mabData["etternavn"] = ".";
}
else if (mabData["fornavn"] != "" && mabData["etternavn"] == ""){	// Skal aldri skje, men why not
	mabData["etternavn"] = ".";
}
var noSN = false;
if (mabData["serial"] == "" || mabData["serial"] == "NA" || mabData["serial"] == "XXXXXXX"){
	noSN = true;
}
console.log(mabData);



// fylle ut feltene i 3C

//modell
var scModel = document.querySelectorAll("input[data-bind=\"css: inputClass, textInput: term\"]");
scModel[0].value = mabData["model"];
console.log(scModel);
scModel[0].dispatchEvent(new Event('input', {bubbles: true}));

//serienummer
var scSerial = document.querySelectorAll("input[data-bind=\"value: serial\"]");
scSerial[0].value = mabData["serial"];
console.log(scSerial);
//scSerial[0].dispatchEvent(new KeyboardEvent('keydown',{'key':'Tab'}));

//kjøpsdato

var scDato = document.querySelectorAll("input[data-bind=\"date: purchaseDate, format: 'YYYY/MM/DD'\"]");
scDato[0].value = mabData["dato"];
console.log(scDato);
//scDato[0].dispatchEvent(new Event('input', {bubbles: true}));


//land, skal være ferdigvalgt til Norge, 
//men kan manuelt settes til verdien "NO" for sikkerthets skyld
/* CSS targeter
data-bind="options: countries().options,
										optionsText: 'value',
										optionsValue: 'key',
										value: countries().selected, optionsCaption: '',
                                        disable: countries().options().length == 0"
*/

//trykke på GET INFO knapp og gå videre til neste steg
setTimeout(function() {
	document.querySelector('button[data-bind="i18n: \'unit-info.submit\'"]').click();
}, 1000);


//butikkreferanse
var scButikkref = document.querySelectorAll("input[data-bind=\"value: reference\"]");
scButikkref[0].value = mabData["butikkref"];

//fornavn
var scFornavn = document.querySelectorAll("input[data-bind=\"value: firstName\"]");
scFornavn[0].value = mabData["fornavn"];

//etternavn
var scEtternavn = document.querySelectorAll("input[data-bind=\"value: lastName\"]");
scEtternavn[0].value = mabData["etternavn"];

//språk, må settes til verdien "NO"
/* CSS targeter:
data-bind="options: language().options,
                                                        optionsText: 'value',
                                                        optionsValue: 'key',
                                                        value: language().selected, optionsCaption: '',
                                                        valueUpdate: 'keyup'"
*/
//lag en array av alle select elementer, har sjekket og den tredje [2] er korrekt
/*
var scLang = document.querySelectorAll("select");
console.log(scLang);
scLang[2].value = "NO";
*/

//adresse
var scAdresse = document.querySelectorAll("input[data-bind=\"value: address().address1\"]");
scAdresse[0].value = mabData["adresse"];

//postnummer
var scPostnummer = document.querySelectorAll("input[data-bind=\"value: address().zipCode\"]");
scPostnummer[0].value = mabData["postnummer"];

//poststed
var scPoststed = document.querySelectorAll("input[data-bind=\"value: address().city\"]");
scPoststed[0].value = mabData["poststed"];

//epost
var scEpost = document.querySelectorAll("input[data-bind=\"disable: noemail(), value: email, tooltip: 'formatTooltips.email'\"]");
scEpost[0].value = mabData["epost"];

//tlf nummer, begge skal være lik og begynne med 0047
var scTlf1 = document.querySelectorAll("input[data-bind=\"textInput: phone().fixed\"]");
scTlf1[0].value = "0047" + mabData["tlf"];
var scTlf2 = document.querySelectorAll("input[data-bind=\"textInput: phone().mobile\"]");
scTlf2[0].value = "0047" + mabData["tlf"];

//servicenummer
var scServicenummer = document.querySelectorAll("input[data-bind=\"value: rAscCaseId, tooltip: 'formatTooltips.rAscCaseId'\"]");
scServicenummer[0].value = mabData["servicenummer"];

//feilbeskrivelse

var scFeilbeskrivelse = document.querySelectorAll("textarea");
scFeilbeskrivelse[0].value = mabData["feilbeskrivelse"];
