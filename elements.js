const ELEMENTS = [
  { number: "1", symbol: "H", name: "Hydrogen", weight: "1.008" },
  { number: "2", symbol: "He", name: "Helium", weight: "4.0026" },
  {
    number: "3",
    symbol: "Li",
    name: "Lithium",
    weight: "6.94",
  },
  {
    number: "4",
    symbol: "Be",
    name: "Beryllium",
    weight: "9.0121",
  },
  {
    number: "5",
    symbol: "B",
    name: "Boron",
    weight: "10.81",
  },
  {
    number: "6",
    symbol: "C",
    name: "Carbon",
    weight: "12.011",
  },
  {
    number: "7",
    symbol: "N",
    name: "Nitrogen",
    weight: "14.007",
  },
  {
    number: "8",
    symbol: "O",
    name: "Oxygen",
    weight: "15.999",
  },
  {
    number: "9",
    symbol: "F",
    name: "Fluorine",
    weight: "18.998",
  },
  {
    number: "10",
    symbol: "Ne",
    name: "Neon",
    weight: "20.179",
  },
  {
    number: "11",
    symbol: "Na",
    name: "Sodium",
    weight: "22.989",
  },
  {
    number: "12",
    symbol: "Mg",
    name: "Magnesium",
    weight: "24.305",
  },
  {
    number: "13",
    symbol: "Al",
    name: "Aluminium",
    weight: "26.981",
  },
  {
    number: "14",
    symbol: "Si",
    name: "Silicon",
    weight: "28.085",
  },
  {
    number: "15",
    symbol: "P",
    name: "Phosphorus",
    weight: "30.973",
  },
  {
    number: "16",
    symbol: "S",
    name: "Sulfur",
    weight: "32.06",
  },
  {
    number: "17",
    symbol: "Cl",
    name: "Chlorine",
    weight: "35.45",
  },
  {
    number: "18",
    symbol: "Ar",
    name: "Argon",
    weight: "39.95",
  },
  {
    number: "19",
    symbol: "K",
    name: "Potassium",
    weight: "39.098",
  },
  {
    number: "20",
    symbol: "Ca",
    name: "Calcium",
    weight: "40.078",
  },
  {
    number: "21",
    symbol: "Sc",
    name: "Scandium",
    weight: "44.955",
  },
  { number: "22", symbol: "Ti", name: "Titanium", weight: "47.867" },
  { number: "23", symbol: "V", name: "Vanadium", weight: "50.9415" },
  {
    number: "24",
    symbol: "Cr",
    name: "Chromium",
    weight: "51.996",
  },
  {
    number: "25",
    symbol: "Mn",
    name: "Manganese",
    weight: "54.938",
  },
  { number: "26", symbol: "Fe", name: "Iron", weight: "55.845" },
  {
    number: "27",
    symbol: "Co",
    name: "Cobalt",
    weight: "58.933",
  },
  { number: "28", symbol: "Ni", name: "Nickel", weight: "58.693" },
  {
    number: "29",
    symbol: "Cu",
    name: "Copper",
    weight: "63.546",
  },
  { number: "30", symbol: "Zn", name: "Zinc", weight: "65.38" },
  { number: "31", symbol: "Ga", name: "Gallium", weight: "69.723" },
  {
    number: "32",
    symbol: "Ge",
    name: "Germanium",
    weight: "72.630",
  },
  {
    number: "33",
    symbol: "As",
    name: "Arsenic",
    weight: "74.921",
  },
  {
    number: "34",
    symbol: "Se",
    name: "Selenium",
    weight: "78.971",
  },
  {
    number: "35",
    symbol: "Br",
    name: "Bromine",
    weight: "79.904",
  },
  {
    number: "36",
    symbol: "Kr",
    name: "Krypton",
    weight: "83.798",
  },
  {
    number: "37",
    symbol: "Rb",
    name: "Rubidium",
    weight: "85.467",
  },
  {
    number: "38",
    symbol: "Sr",
    name: "Strontium",
    weight: "87.62",
  },
  { number: "39", symbol: "Y", name: "Yttrium", weight: "88.905" },
  {
    number: "40",
    symbol: "Zr",
    name: "Zirconium",
    weight: "91.224",
  },
  {
    number: "41",
    symbol: "Nb",
    name: "Niobium",
    weight: "92.906",
  },
  {
    number: "42",
    symbol: "Mo",
    name: "Molybdenum",
    weight: "95.95",
  },
  {
    number: "43",
    symbol: "Tc",
    name: "Technetium",
    weight: "98",
  },
  {
    number: "44",
    symbol: "Ru",
    name: "Ruthenium",
    weight: "101.07",
  },
  {
    number: "45",
    symbol: "Rh",
    name: "Rhodium",
    weight: "102.90",
  },
  {
    number: "46",
    symbol: "Pd",
    name: "Palladium",
    weight: "106.42",
  },
  {
    number: "47",
    symbol: "Ag",
    name: "Silver",
    weight: "107.86",
  },
  {
    number: "48",
    symbol: "Cd",
    name: "Cadmium",
    weight: "112.41",
  },
  { number: "49", symbol: "In", name: "Indium", weight: "114.81" },
  {
    number: "50",
    symbol: "Sn",
    name: "Tin",
    weight: "118.71",
  },
  {
    number: "51",
    symbol: "Sb",
    name: "Antimony",
    weight: "121.76",
  },
  {
    number: "52",
    symbol: "Te",
    name: "Tellurium",
    weight: "127.60",
  },
  { number: "53", symbol: "I", name: "Iodine", weight: "126.90" },
  {
    number: "54",
    symbol: "Xe",
    name: "Xenon",
    weight: "131.29",
  },
  {
    number: "55",
    symbol: "Cs",
    name: "Caesium",
    weight: "132.90",
  },
  { number: "56", symbol: "Ba", name: "Barium", weight: "137.32" },
  {
    number: "57",
    symbol: "La",
    name: "Lanthanum",
    weight: "138.90",
  },
  {
    number: "58",
    symbol: "Ce",
    name: "Cerium",
    weight: "140.11",
  },
  {
    number: "59",
    symbol: "Pr",
    name: "Praseodymium",
    weight: "140.90",
  },
  {
    number: "60",
    symbol: "Nd",
    name: "Neodymium",
    weight: "144.24",
  },
  {
    number: "61",
    symbol: "Pm",
    name: "Promethium",
    weight: "145",
  },
  {
    number: "62",
    symbol: "Sm",
    name: "Samarium",
    weight: "150.36",
  },
  {
    number: "63",
    symbol: "Eu",
    name: "Europium",
    weight: "151.96",
  },
  {
    number: "64",
    symbol: "Gd",
    name: "Gadolinium",
    weight: "157.25",
  },
  {
    number: "65",
    symbol: "Tb",
    name: "Terbium",
    weight: "158.92",
  },
  {
    number: "66",
    symbol: "Dy",
    name: "Dysprosium",
    weight: "162.50",
  },
  {
    number: "67",
    symbol: "Ho",
    name: "Holmium",
    weight: "164.93",
  },
  {
    number: "68",
    symbol: "Er",
    name: "Erbium",
    weight: "167.25",
  },
  {
    number: "69",
    symbol: "Tm",
    name: "Thulium",
    weight: "168.93",
  },
  {
    number: "70",
    symbol: "Yb",
    name: "Ytterbium",
    weight: "173.04",
  },
  {
    number: "71",
    symbol: "Lu",
    name: "Lutetium",
    weight: "174.96",
  },
  { number: "72", symbol: "Hf", name: "Hafnium", weight: "178.49" },
  {
    number: "73",
    symbol: "Ta",
    name: "Tantalum",
    weight: "180.94",
  },
  { number: "74", symbol: "W", name: "Tungsten", weight: "183.84" },
  { number: "75", symbol: "Re", name: "Rhenium", weight: "186.20" },
  {
    number: "76",
    symbol: "Os",
    name: "Osmium",
    weight: "190.23",
  },
  { number: "77", symbol: "Ir", name: "Iridium", weight: "192.21" },
  {
    number: "78",
    symbol: "Pt",
    name: "Platinum",
    weight: "195.08",
  },
  {
    number: "79",
    symbol: "Au",
    name: "Gold",
    weight: "196.96",
  },
  { number: "80", symbol: "Hg", name: "Mercury", weight: "200.59" },
  {
    number: "81",
    symbol: "Tl",
    name: "Thallium",
    weight: "204.38",
  },
  {
    number: "82",
    symbol: "Pb",
    name: "Lead",
    weight: "207.2",
  },
  {
    number: "83",
    symbol: "Bi",
    name: "Bismuth",
    weight: "208.98",
  },
  { number: "84", symbol: "Po", name: "Polonium", weight: "209" },
  { number: "85", symbol: "At", name: "Astatine", weight: "210" },
  { number: "86", symbol: "Rn", name: "Radon", weight: "222" },
  { number: "87", symbol: "Fr", name: "Francium", weight: "223" },
  { number: "88", symbol: "Ra", name: "Radium", weight: "226" },
  { number: "89", symbol: "Ac", name: "Actinium", weight: "227" },
  {
    number: "90",
    symbol: "Th",
    name: "Thorium",
    weight: "232.03",
  },
  {
    number: "91",
    symbol: "Pa",
    name: "Protactinium",
    weight: "231.03",
  },
  {
    number: "92",
    symbol: "U",
    name: "Uranium",
    weight: "238.02",
  },
  {
    number: "93",
    symbol: "Np",
    name: "Neptunium",
    weight: "237",
  },
  {
    number: "94",
    symbol: "Pu",
    name: "Plutonium",
    weight: "244",
  },
  {
    number: "95",
    symbol: "Am",
    name: "Americium",
    weight: "243",
  },
  { number: "96", symbol: "Cm", name: "Curium", weight: "247" },
  {
    number: "97",
    symbol: "Bk",
    name: "Berkelium",
    weight: "247",
  },
  {
    number: "98",
    symbol: "Cf",
    name: "Californium",
    weight: "251",
  },
  {
    number: "99",
    symbol: "Es",
    name: "Einsteinium",
    weight: "252",
  },
  { number: "100", symbol: "Fm", name: "Fermium", weight: "257" },
  {
    number: "101",
    symbol: "Md",
    name: "Mendelevium",
    weight: "258",
  },
  {
    number: "102",
    symbol: "No",
    name: "Nobelium",
    weight: "259",
  },
  {
    number: "103",
    symbol: "Lr",
    name: "Lawrencium",
    weight: "266",
  },
  {
    number: "104",
    symbol: "Rf",
    name: "Rutherfordium",
    weight: "267",
  },
  { number: "105", symbol: "Db", name: "Dubnium", weight: "268" },
  {
    number: "106",
    symbol: "Sg",
    name: "Seaborgium",
    weight: "269",
  },
  { number: "107", symbol: "Bh", name: "Bohrium", weight: "270" },
  { number: "108", symbol: "Hs", name: "Hassium", weight: "270" },
  {
    number: "109",
    symbol: "Mt",
    name: "Meitnerium",
    weight: "278",
  },
  {
    number: "110",
    symbol: "Ds",
    name: "Darmstadtium",
    weight: "281",
  },
  {
    number: "111",
    symbol: "Rg",
    name: "Roentgenium",
    weight: "282",
  },
  {
    number: "112",
    symbol: "Cn",
    name: "Copernicium",
    weight: "285",
  },
  {
    number: "113",
    symbol: "Nh",
    name: "Nihonium",
    weight: "286",
  },
  {
    number: "114",
    symbol: "Fl",
    name: "Flerovium",
    weight: "289",
  },
  {
    number: "115",
    symbol: "Mc",
    name: "Moscovium",
    weight: "290",
  },
  {
    number: "116",
    symbol: "Lv",
    name: "Livermorium",
    weight: "293",
  },
  {
    number: "117",
    symbol: "Ts",
    name: "Tennessine",
    weight: "294",
  },
  {
    number: "118",
    symbol: "Og",
    name: "Oganesson",
    weight: "294",
  },
];

function checkElement(element) {
  for (var i = 0; i < ELEMENTS.length; i++)
    if (ELEMENTS[i].symbol.toLowerCase() === element.toLowerCase()) {
      return { ...ELEMENTS[i], real: true };
    }
  return createElement(element);
}

function createElement(name) {
  var weight =
    500 + name.charCodeAt(0) + (name.length > 1 ? name.charCodeAt(1) : 0);
  var number =
    ELEMENTS.length +
    name.charCodeAt(0) +
    (name.length > 1 ? name.charCodeAt(1) : 0);

  return { symbol: name, weight, number, real: false };
}

function checkResult(result) {
  var onlyReal = true;
  for (var i = 0; i < result.length; i++)
    onlyReal = onlyReal && checkElement(result[i]).real;
  return onlyReal;
}

function algorithm(word) {
  var results = [[word[0]]];

  for (var i = 1; i < word.length; i++) {
    var len = results.length;
    for (var j = 0; j < len; j++) {
      if (results[j][results[j].length - 1].length === 1) {
        const newResult = [...results[j], word[i]];
        results[j][results[j].length - 1] =
          results[j][results[j].length - 1] + word[i];
        results.push(newResult);
      } else {
        results[j].push(word[i]);
      }
    }
  }

  return results;
}

function capitalize(e) {
  return e.charAt(0).toUpperCase() + e.slice(1, e.length);
}

function executeWithUrlParams() {
  var searchParams = new URLSearchParams(window.location.search);
  var execute = false;
  if (searchParams.has("word")) {
    $("#word").val(searchParams.get("word").toLowerCase());
    execute = true;
  }
  if (searchParams.has("color")) {
    $("#" + searchParams.get("color").toLowerCase()).prop("checked", true);
  }
  if (execute) $("#btn").click();
}
