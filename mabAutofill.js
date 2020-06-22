function fiksFormattering(s) {
	// bytter ut alle feilformaterte æøå i input string s
	var re = [/Ã¦/g, /Ã¸/g, /Ã¥/g, /Ã†/g, /Ã˜/g, /Ã…/g, /Ã¶/g, /Ã¤/g, /Ã©/g];
	var rep = ["æ", "ø", "å", "Æ", "Ø", "Å", "ö", "ä", "é"];
	console.log(s);
	for (var i = 0; i < re.length; i++) {
		//regex match alle formater i re array og bytt ut med bokstav på tilsvarende posisjon i rep array
		var prevS = s;
		s = s.replace(re[i], rep[i]);
		if (prevS != s) {
			console.log(re[i], rep[i]);
			console.log(s);
		}
	}
	return s;
}

function mabAutofill() {

	// finn ut hvilken side scriptet kjøres på
	var currentURL = document.URL;
	//console.log(currentURL);
	mabData = JSON.parse(prompt("Lim inn data fra MAB", ""));
	//console.log(mabData);

	// lag en array med array for alle elementer i mabData
	var tempObj = Object.entries(mabData);
	//console.log(tempObj);

	// iterer over array og mabdata for å bytte ut feilformaterte æøå
	for (i = 0; i < tempObj.length; i++) {
		//console.log(tempObj[i]);
		mabData[tempObj[i][0]] = fiksFormattering(tempObj[i][1]);
	}
	//console.log(mabData);


	if (currentURL == "https://exchange.serviceinfo.se/store_reg_neworder.asp") {
		loadJS('https://spirevipp.github.io/mabAutofill/modelList.js', autofilleXchange(mabData), document.body);
	} else if (currentURL == "https://3cgui.sony.eu/serviceportal/#/create-service-event-2") {
		autofill3C(mabData);
	} else {
		alert("Ugyldig nettside, funker kun i 3cgui service registrering og eXchange registrering");
	}
}

// MAB -> 3C spesifikke ting
var autofill3C = function (d) {
	//console.log(d);
	var dataInput = d;


	// Sjekke om enkelte felt er tomme, og fylle ut med placeholder
	// Sjekker tlf, adresse, postnr, poststed, epost, serienummer, navn
	// navn blir også flyttet og korrigert hvis det er butikk
	// serienummer sjekker om det er XXXXXXX, NA, eller tom, og markerer no serial boksen om mulig
	// hvis ingen epost blir no email knapp valgt
	if (dataInput["tlf"] == "") {
		dataInput["tlf"] = "99999999";
	}
	var noEmail = false;
	if (dataInput["epost"] == "") {
		noEmail = true;
	}
	if (dataInput["adresse"] == "") {
		dataInput["adresse"] = ".";
	}
	if (dataInput["postnummer"] == "") {
		dataInput["postnummer"] = "0000";
	}
	if (dataInput["poststed"] == "") {
		dataInput["poststed"] = "."
	}
	if (dataInput["fornavn"] == "" && dataInput["etternavn"] != "") {
		dataInput["fornavn"] = dataInput["etternavn"];
		dataInput["etternavn"] = ".";
	} else if (dataInput["fornavn"] == "" && dataInput["etternavn"] == "") { // Skal aldri skje, men why not
		dataInput["fornavn"] = ".";
		dataInput["etternavn"] = ".";
	} else if (dataInput["fornavn"] != "" && dataInput["etternavn"] == "") { // Skal aldri skje, men why not
		dataInput["etternavn"] = ".";
	}
	var noSN = false;
	if (dataInput["serial"] == "" || dataInput["serial"] == "NA" || dataInput["serial"] == "XXXXXXX") {
		noSN = true;
	}
	if (dataInput["dato"] == "") {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		today = yyyy + '/' + mm + '/' + dd;
		dataInput["dato"] = today;
	}
	// reverser dato rekkefølge
	var tmpVar = dataInput["dato"];
	tmpVar = tmpVar.split(".");
	dataInput["dato"] = tmpVar[2].concat("/", tmpVar[1], "/", tmpVar[0]);
	//console.log(dataInput);



	// fylle ut feltene i 3C

	//modell
	var scModel = document.querySelectorAll("input[data-bind=\"css: inputClass, textInput: term\"]");
	scModel[0].value = dataInput["model"];
	//console.log(scModel);
	scModel[0].dispatchEvent(new Event('input', {
		bubbles: true
	}));

	//serienummer
	var scSerial = document.querySelectorAll("input[data-bind=\"value: serial\"]");
	scSerial[0].focus();
	scSerial[0].dispatchEvent(new KeyboardEvent('keydown',{'key':'Space'}));
	scSerial[0].value = dataInput["serial"];
	//console.log(scSerial);
	//scSerial[0].dispatchEvent(new KeyboardEvent('keydown',{'key':'Tab'}));

	//kjøpsdato

	var scDato = document.querySelectorAll("input[data-bind=\"date: purchaseDate, format: 'YYYY/MM/DD'\"]");
	scDato[0].value = dataInput["dato"];
	//console.log(scDato);
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
	setTimeout(function () {
		document.querySelector('button[data-bind="i18n: \'unit-info.submit\'"]').click();
	}, 1000);


	//butikkreferanse
	var scButikkref = document.querySelectorAll("input[data-bind=\"value: reference\"]");
	scButikkref[0].value = dataInput["butikkref"];

	//fornavn
	var scFornavn = document.querySelectorAll("input[data-bind=\"value: firstName\"]");
	scFornavn[0].value = dataInput["fornavn"];

	//etternavn
	var scEtternavn = document.querySelectorAll("input[data-bind=\"value: lastName\"]");
	scEtternavn[0].value = dataInput["etternavn"];

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
	scAdresse[0].value = dataInput["adresse"];

	//postnummer
	var scPostnummer = document.querySelectorAll("input[data-bind=\"value: address().zipCode\"]");
	scPostnummer[0].value = dataInput["postnummer"];

	//poststed
	var scPoststed = document.querySelectorAll("input[data-bind=\"value: address().city\"]");
	scPoststed[0].value = dataInput["poststed"];

	//epost
	var scEpost = document.querySelectorAll("input[data-bind=\"disable: noemail(), value: email, tooltip: 'formatTooltips.email'\"]");
	scEpost[0].value = dataInput["epost"];

	//tlf nummer, begge skal være lik og begynne med 0047
	var scTlf1 = document.querySelectorAll("input[data-bind=\"textInput: phone().fixed\"]");
	scTlf1[0].value = "0047" + dataInput["tlf"];
	var scTlf2 = document.querySelectorAll("input[data-bind=\"textInput: phone().mobile\"]");
	scTlf2[0].value = "0047" + dataInput["tlf"];

	//servicenummer
	var scServicenummer = document.querySelectorAll("input[data-bind=\"value: rAscCaseId, tooltip: 'formatTooltips.rAscCaseId'\"]");
	scServicenummer[0].value = dataInput["servicenummer"];

	//feilbeskrivelse

	var scFeilbeskrivelse = document.querySelectorAll("textarea");
	scFeilbeskrivelse[0].value = dataInput["feilbeskrivelse"];
}

// eXchange spesifikk
var autofilleXchange = function (d) {
	var dataInput = d;


	//funker ikke as is, flere felter må fylles ut og "submittes" før andre dukker opp

	/*
	scServicenummer = document.getElementById("OrderNumber");
	scServicenummer.value = mabData["servicenummer"];

	var scMerke = document.getElementById("sMakeNameSinet"); //(Sony er value 133)
	scMerke.value = 133;

	// produktgruppe, skal lage noen predefined oversettelser fra mab
	// var scProduktgruppe = document.getElementById("sObjectNameSinet");
	//var scUnderProduktgruppe = document.getElementById("sSubObjectNameSinet");

	var scLeverandør = document.getElementById("sSupplierSinet"); //(Sony norge er value 2247)
	scLeverandør = 2247;
	*/

	var scNavn = document.getElementById("ServiceOwner");
	scNavn.value = dataInput["fornavn"] + " " + dataInput["etternavn"];

	var scTlf = document.getElementById("ServiceLocationPhone");
	scTlf.value = dataInput["tlf"];

	var scAdresse = document.getElementById("ServiceAddress");
	scAdresse.value = dataInput["adresse"];

	var scPostnummer = document.getElementById("ServicePostalCode");
	scPostnummer.value = dataInput["postnummer"];

	var scPoststed = document.getElementById("ServicePostalTown");
	scPoststed.value = dataInput["poststed"];

	var scEpost = document.getElementById("ServiceLocationEmail");
	scEpost.value = dataInput["epost"];

	if (dataInput["rev"] == "") {
		dataInput["rev"] = "Default";
	};
	var scModel = document.getElementById("ModelCode");
	scModel.value = geteXchangeModel(dataInput["model"], dataInput["rev"]);

	var scSerial = document.getElementById("SerialNumber");
	scSerial.value = dataInput["serial"];

	var scFeilbeskrivelse = document.getElementById("CustFaultDescription");
	scFeilbeskrivelse.value = dataInput["feilbeskrivelse"];
}