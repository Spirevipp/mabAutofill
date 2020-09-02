function fiksFormattering(s) {
    // bytter ut alle feilformaterte æøå i input string s
    var re = [/Ã¦/g, /Ã¸/g, /Ã¥/g, /Ã†/g, /Ã˜/g, /Ã…/g, /Ã¶/g, /Ã¤/g, /Ã©/g];
    var rep = ["æ", "ø", "å", "Æ", "Ø", "Å", "ö", "ä", "é"];
    //console.log(s);
    for (var i = 0; i < re.length; i++) {
        //regex match alle formater i re array og bytt ut med bokstav på tilsvarende posisjon i rep array
        var prevS = s;
        s = s.replace(re[i], rep[i]);
        /*
        if (prevS != s) {
        	console.log(re[i], rep[i]);
        	console.log(s);
        }
        */
    }
    return s;
}

function mabAutofill() {

    // hent mabdata via lim inn i popup + alt+f10 i mab
    // lag en array med array for alle elementer i mabData
    mabData = JSON.parse(prompt("Lim inn data fra MAB", ""));
    var tempObj = Object.entries(mabData);

    // iterer over array og mabdata for å bytte ut feilformaterte æøå
    for (i = 0; i < tempObj.length; i++) {
        mabData[tempObj[i][0]] = fiksFormattering(tempObj[i][1]);
    }

    autofillLogiq(mabData);
}

var getLogiqModel = function (m, c) {
    // m = modell
    // c = det som blir skrevet i "Revisjon" feltet i MAB
    // m og c skal alltid ha en verdi, fikses før denne fuksjonen blir kalt
    // hvis "Revisjon" feltet er tomt skal c være "Default"
    var correctModel = modelList[m][c] || m;
    return correctModel;
}

var autofillLogiq = function (d) {
    var dataInput = d;
    if (dataInput["rev"] == "") {
        dataInput["rev"] = "Default";
    };
    dataInput["model"] = getLogiqModel(dataInput["model"], dataInput["rev"]);

    //TODO sett dato i ddmmyyyy format
    var tmpVar = dataInput["dato"];
	tmpVar = tmpVar.split(".");
	dataInput["dato"] = tmpVar[0].concat("", tmpVar[1], "", tmpVar[2]);

    var scServicenummer = document.getElementById("OrderNumber");
    scServicenummer.value = dataInput["servicenummer"];

	var scModel = document.getElementById("type");
	scModel.value = dataInput["model"];

    var scSerial = document.getElementById("serialno");
    scSerial.value = dataInput["serial"];

    var scSolgt = document.getElementById("sold");
    scSolgt.value = "S";

    var scAArsak = document.getElementById("exchgcause");
    scAArsak.value = "X";

    var scByttinf = document.getElementById("exchginfo");
    scByttinf.value = "F";

	var scDato = document.getElementById("salesdate");
	scDato.value = dataInput["dato"];

    var scButikkref = document.getElementById("refnodeal");
	scButikkref.value = dataInput["butikkref"];

	var scNavn = document.getElementById("cusname");
	scNavn.value = dataInput["fornavn"] + " " + dataInput["etternavn"];

	var scAdresse = document.getElementById("cusaddr");
    scAdresse.value = dataInput["adresse"];
    
    var scPostnummer = document.getElementById("postnr");
    scPostnummer.value = dataInput["postnummer"];

    var scPoststed = document.getElementById("poststed");
    scPoststed.value = dataInput["poststed"];

	var scEpost = document.getElementById("cusemail");
	scEpost.value = dataInput["epost"];

	var scTlf = document.getElementById("cusphone");
    scTlf.value = dataInput["tlf"];

	var scServicenummer = document.getElementById("refnowrk");
	scServicenummer.value = dataInput["servicenummer"];

	var scFeilbeskrivelse = document.getElementById("msg2deliv");
	scFeilbeskrivelse.value = dataInput["feilbeskrivelse"];
    
}

var modelList = {
    // Hodetelefoner
    WH1000XM3: {
        Default: "WH1000XM3",
        Black: "WH1000XM3BLK",
        Silver: "WH1000XM3SIL"
    },
    WH1000XM2: {
        Default: "WH1000XM2B.CE7",
        Black: "H1000XM2B.CE7",
        Gold: "WH1000XM2N.CE7"
    },
    MDR1000X: {
        Default: "MDR1000XB.CE7",
        Black: "MDR1000XB.CE7",
        Beige: "MDR1000XC.CE7"
    },
    WHH900N: {
        Default: "WHH900NB.CE7",
        Black: "WHH900NB.CE7",
        Gray: "WHH900NB.CE7",
        Grey: "WHH900NB.CE7",
        Gold: "WHH900NN.CE7",
        Green: "WHH900NG.CE7",
        Red: "WHH900NR.CE7",
        Blue: "WHH900NL.CE7"
    },
    WHH910N: {
        Default: "WHH900N",
        Black: "WHH910N",
        Silver: "WHH910N"
    },
    WHXB900N: {
        Default: "WHXB900N",
        Black: "WHXB900BLK",
        Blue: "WHXB900BLU"
    },
    WHH800: {
        Default: "WHH800B.CE7",
        Black: "WHH800B.CE7",
        Gray: "WHH800B.CE7",
        Grey: "WHH800B.CE7",
        Gold: "WHH800N.CE7",
        Green: "WHH800G.CE7",
        Red: "WHH800R.CE7",
        Blue: "WHH800L.CE7"
    },
    WHXB700: {
        Default: "WHXB700",
        Black: "WHXB700BLACK",
        Blue: "WHXB700BLUE"
    },
    // Øreplugger
    WF1000XM3: {
        Default: "WF1000XM3",
        Black: "WF1000XM3BK",
        Silver: "WF1000XM3SI"
    },
    WF1000X: {
        Default: "WF1000XB.CE7",
        Black: "WF1000XB.CE7",
        Gold: "WF1000XN.CE7"
    },
    WFSP900: {
        Default: "WFSP900",
        Black: "WFSP900",
        White: "WFSP900",
        Gold: "WFSP900"
    },
    WFSP800N: {
        Default: "WFSP800N",
        Black: "WFSP800N",
        Blue: "WFSP800N"
    },
    WFSP700N: {
        Default: "WFSP700N",
        Black: "WFSP700NBLK",
        White: "WFSP700NWHT",
        Yellow: "WFSP700NYLW",
        Pink: "WFSP700NPNK"
    },
    WFXB700: {
        Default: "WFXB700",
        Black: "WFXB700",
        Blue: "WFXB700"
    },
    WI1000X: {
        Default: "WI1000XB.CE7",
        Black: "WI1000XB.CE7",
        Gold: "WI1000XN.CE7"
    },
    // Lydplanker
    SAMT300: {
        Default: "HTMT300"
    },
    SAMT301: {
        Default: "HTMT301"
    },
    SAMT500: {
        Default: "HTMT500"
    },
    SAST5000: {
        Default: "HTST5000"
    },
    SAX8500: {
        Default: "HTX8500"
    },
    SAXF9000: {
        Default: "SONYHTXF9000"
    },
    SAZF9: {
        Default: "SONYHTZF9"
    },
    SACT790: {
        Default: "HTCT790"
    },
    // Receivere
    STRDN1080: {
        Default: "STRDN1080"
    },
    STRDN1070: {
        Default: "STRDN1070"
    },
    STRDN1060: {
        Default: "STRDN1060"
    },
    // Lowcost
    XDRV20D: {
        Default: "XDRV20DH.CEK",
        Black: "XDRV20DH.CEK",
        Gray: "XDRV20DH.CEK",
        Grey: "XDRV20DH.CEK",
        White: "XDRV20DW.CEK",
        Pink: "XDRV20DP.CEK",
        Blue: "XDRV20DL.CEK"
    },
    XDRC1DBP: {
        Default: "XDRC1DBP.CEK"
    },
    XDRV1BTD: {
        Default: "XDRV1BTDB.CEK",
        Black: "XDRV1BTDB.CEK",
        White: "XDRV1BTDW.CEK",
        Brown: "XDRV1BTDT.CEK"
    },
    ZSPS55: {
        Default: "ZSPS55B.CEK"
    }
};