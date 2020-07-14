function geteXchangeModel(m, c) {
    // m = modell
    // c = det som blir skrevet i "Revisjon" feltet i MAB
    // m og c skal alltid ha en verdi, fikses før denne fuksjonen blir kalt
    // hvis "Revisjon" feltet er tomt skal c være "Default"
    var correctModel = modelList[m][c] || m;
    return correctModel;
}

var modelList = {
    // Hodetelefoner
    WH1000XM3: {
        Default: "WH1000XM3",
        Black: "WH1000XM3BLK",
        Silver: "WH1000XM3SIL"
    },
    WH1000XM2: {
        Default: "WH1000XM2",
        Black: "WH1000BLACK",
        Gold: "WH1000GOLD"
    },
    MDR1000X: {
        Default: "MDR1000X",
        Black: "MDR1000XB",
        Beige: "MDR1000XC"
    },
    WHH900N: {
        Default: "WHH900N",
        Black: "WHH900NBLACK",
        Gray: "WHH900NBLACK",
        Grey: "WHH900NBLACK",
        Gold: "WHH900NGOLD",
        Green: "WHH900NGREEN",
        Red: "WHH900NRED",
        Blue: "WHH900NBLUE"
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
        Default: "WHH800",
        Black: "WHH800BLACK",
        Gray: "WHH800BLACK",
        Grey: "WHH800BLACK",
        Gold: "WHH800GOLD",
        Green: "WHH800GREEN",
        Red: "WHH800RED",
        Blue: "WHH800BLUE"
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
        Default: "WF1000X",
        Black: "WF1000BLACK",
        Gold: "WF1000GOLD"
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
        Default: "WI1000X",
        Black: "WI1000BLACK",
        Gold: "WI1000GOLD"
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
        Default: "XDRV20D"
    },
    XDRC1DBP: {
        Default: "XDRC1DBP"
    },
    XDRV1BTD: {
        Default: "XDRV1BTD",
        Black: "XDRV1BTDB",
        White: "XDRV1BTDW",
        Brown: "XDRV1BTD"
    },
    ZSPS55: {
        Default: "ZSPS55B"
    }
};