const countryCodes = {
  Antarctica: "AQ",
  Rwanda: "RW",
  Chad: "TD",
  "Central African Republic": "CF",
  Burundi: "BI",
  Panama: "PA",
  Nicaragua: "NI",
  Mexico: "MX",
  Honduras: "HN",
  Guatemala: "GT",
  "El Salvador": "SV",
  "Costa Rica": "CR",
  Belize: "BZ",
  Uzbekistan: "UZ",
  Turkmenistan: "TM",
  Tajikistan: "TJ",
  Kyrgyzstan: "KG",
  Kazakhstan: "KZ",
  Slovakia: "SK",
  Hungary: "HU",
  Switzerland: "CH",
  Liechtenstein: "LI",
  Czechia: "CZ",
  Austria: "AT",
  Japan: "JP",
  China: "CN",
  Uganda: "UG",
  Somalia: "SO",
  Kenya: "KE",
  Ethiopia: "ET",
  Eritrea: "ER",
  Djibouti: "DJ",
  Belarus: "BY",
  Ukraine: "UA",
  Poland: "PL",
  Lithuania: "LT",
  Latvia: "LV",
  Estonia: "EE",
  Seychelles: "SC",
  Mayotte: "YT",
  Mauritius: "MU",
  Madagascar: "MG",
  Comoros: "KM",
  "United States of America": "US",
  Canada: "flag-ca",
  "Saint Pierre and Miquelon": "PM",
  Greenland: "GL",
  "United States Minor Outlying Islands": "UM",
  "Western Sahara": "EH",
  Tunisia: "TN",
  Sudan: "SD",
  Morocco: "MA",
  Egypt: "EG",
  Algeria: "DZ",
  Mongolia: "MN",
  Iceland: "IS",
  Sweden: "SE",
  Norway: "NO",
  Finland: "FI",
  "Faroe Islands": "FO",
  Denmark: "DK",
  "Wallis and Futuna": "WF",
  "New Caledonia": "NC",
  "French Polynesia": "PF",
  Vanuatu: "VU",
  Tuvalu: "TV",
  Tonga: "TO",
  Tokelau: "TK",
  "Solomon Islands": "SB",
  "Papua New Guinea": "PG",
  Palau: "PW",
  "Northern Mariana Islands": "MP",
  "Norfolk Island": "NF",
  Niue: "NU",
  "New Zealand": "NZ",
  Nauru: "NR",
  "Micronesia (Federated States of)": "FM",
  "Marshall Islands": "MH",
  Kiribati: "KI",
  Guam: "GU",
  Fiji: "FJ",
  "Cook Islands": "CK",
  Australia: "AU",
  "American Samoa": "AS",
  Venezuela: "VE",
  Uruguay: "UY",
  Suriname: "SR",
  Peru: "PE",
  Paraguay: "PY",
  Guyana: "GY",
  Ecuador: "EC",
  Colombia: "CO",
  Chile: "CL",
  Brazil: "BR",
  Bolivia: "BO",
  Argentina: "AR",
  "French Guiana": "GF",
  "Sri Lanka": "LK",
  Pakistan: "PK",
  Nepal: "NP",
  Maldives: "MV",
  India: "IN",
  "British Indian Ocean Territory": "IO",
  Bhutan: "BT",
  Bangladesh: "BD",
  Afghanistan: "AF",
  "Saint Helena, Ascension and Tristan da Cunha": "SH",
  "South Georgia and the South Sandwich Islands": "GS",
  "Bouvet Island": "BV",
  Vietnam: "VN",
  Thailand: "TH",
  Singapore: "SG",
  Philippines: "PH",
  Malaysia: "MY",
  Indonesia: "ID",
  "Cocos (Keeling) Islands": "CC",
  "Christmas Island": "CX",
  Cambodia: "KH",
  Romania: "RO",
  Bulgaria: "BG",
  Slovenia: "SI",
  Montenegro: "ME",
  Greece: "flag-gr",
  Croatia: "HR",
  "Bosnia and Herzegovina": "BA",
  Albania: "AL",
  Yemen: "YE",
  "United Arab Emirates": "flag-ae",
  Turkey: "TR",
  "Saudi Arabia": "SA",
  Qatar: "QA",
  Oman: "OM",
  Lebanon: "LB",
  Kuwait: "KW",
  Jordan: "JO",
  Israel: "IL",
  Iraq: "IQ",
  Georgia: "GE",
  Bahrain: "BH",
  Azerbaijan: "AZ",
  Armenia: "AM",
  Cyprus: "CY",
  Spain: "ES",
  Portugal: "flag-pt",
  Gibraltar: "GI",
  Andorra: "AD",
  Zimbabwe: "ZW",
  Zambia: "ZM",
  "South Africa": "ZA",
  Namibia: "NA",
  Mozambique: "MZ",
  Malawi: "MW",
  Lesotho: "LS",
  Eswatini: "SZ",
  Botswana: "BW",
  Angola: "AO",
  "San Marino": "SM",
  Malta: "MT",
  Italy: "IT",
  "Heard Island and McDonald Islands": "HM",
  "Turks and Caicos Islands": "TC",
  "Trinidad and Tobago": "TT",
  "Saint Vincent and the Grenadines": "VC",
  "Saint Lucia": "LC",
  "Saint Kitts and Nevis": "KN",
  "Puerto Rico": "PR",
  Montserrat: "MS",
  Jamaica: "JM",
  Haiti: "HT",
  Grenada: "GD",
  "Dominican Republic": "DO",
  Dominica: "DM",
  Cuba: "CU",
  "Cayman Islands": "KY",
  Bermuda: "BM",
  Barbados: "BB",
  Aruba: "AW",
  "Antigua and Barbuda": "AG",
  Anguilla: "AI",
  Martinique: "MQ",
  Guadeloupe: "GP",
  Togo: "TG",
  "Sierra Leone": "SL",
  Senegal: "SN",
  "Sao Tome and Principe": "ST",
  Nigeria: "NG",
  Niger: "NE",
  Mauritania: "MR",
  Mali: "ML",
  Liberia: "LR",
  "Guinea-Bissau": "GW",
  Guinea: "GN",
  Ghana: "GH",
  Gabon: "GA",
  "Equatorial Guinea": "GQ",
  Cameroon: "CM",
  "Cabo Verde": "CV",
  "Burkina Faso": "BF",
  Benin: "BJ",
  Netherlands: "flag-nl",
  Monaco: "MC",
  Luxembourg: "LU",
  France: "FR",
  Belgium: "BE",
  "United Kingdom": "GB",
  Jersey: "JE",
  Ireland: "IE",
  Guernsey: "GG",
  Germany: "DE",
  Russia: "RU",
  "Timor-Leste": "TL",
  Taiwan: "TW",
  "South Korea": "KR",
  Serbia: "RS",
  "North Macedonia": "MK",
  "North Korea": "KP",
  Myanmar: "MM",
  Moldova: "MD",
  Macao: "MO",
  Laos: "LA",
  "Hong Kong": "HK",
  Brunei: "BN",
  "Åland Islands": "AX",
  "Virgin Islands (U.S.)": "VI",
  "Virgin Islands (British)": "VG",
  "Falkland Islands [Malvinas]": "FK",
  Curaçao: "CW",
  "Bonaire, Sint Eustatius and Saba": "BQ",
  Bahamas: "BS",
  Tanzania: "TZ",
  "South Sudan": "SS",
  "Sint Maarten (Dutch part)": "SX",
  "Saint Martin (French part)": "MF",
  "Saint Barthélemy": "BL",
  Réunion: "RE",
  Libya: "LY",
  Gambia: "GM",
  "Côte d'Ivoire": "CI",
  "Congo (the Democratic Republic of the)": "CD",
  Congo: "CG",
  Syria: "SY",
  "Svalbard and Jan Mayen": "SJ",
  Samoa: "WS",
  Pitcairn: "PN",
  "Palestine, State of": "PS",
  "Isle of Man": "IM",
  Iran: "IR",
  "French Southern Territories": "TF",
  "Holy See": "VA",
};

export default countryCodes;
