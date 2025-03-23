import React, { useEffect, useState, useCallback } from "react";

const B2BAutomations = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

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
    Canada: "CA",
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
    Greece: "GR",
    Croatia: "HR",
    "Bosnia and Herzegovina": "BA",
    Albania: "AL",
    Yemen: "YE",
    "United Arab Emirates": "AE",
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
    Portugal: "PT",
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
    Netherlands: "NL",
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

  const kamName = {
    Antarctica: "@Juliette Ploué",
    Rwanda: "@Salomé Dossavi",
    Chad: "@Salomé Dossavi",
    "Central African Republic": "@Salomé Dossavi",
    Burundi: "@Salomé Dossavi",
    Panama: "@Sara Martin",
    Nicaragua: "@Sara Martin",
    Mexico: "@Sara Martin",
    Honduras: "@Sara Martin",
    Guatemala: "@Sara Martin",
    "El Salvador": "@Sara Martin",
    "Costa Rica": "@Sara Martin",
    Belize: "@Sara Martin",
    Uzbekistan: "@Nihal Abubaker",
    Turkmenistan: "@Nihal Abubaker",
    Tajikistan: "@Nihal Abubaker",
    Kyrgyzstan: "@Nihal Abubaker",
    Kazakhstan: "@Nihal Abubaker",
    Slovakia: "@Xuan Tong",
    Hungary: "@Xuan Tong",
    Switzerland: "@Salomé Dossavi",
    Liechtenstein: "@Nihal Abubaker",
    Czechia: "@Nihal Abubaker",
    Austria: "@Nihal Abubaker",
    Japan: "@Xuan Tong",
    China: "@Xuan Tong",
    Uganda: "@Salomé Dossavi",
    Somalia: "@Salomé Dossavi",
    Kenya: "@Salomé Dossavi",
    Ethiopia: "@Salomé Dossavi",
    Eritrea: "@Salomé Dossavi",
    Djibouti: "@Salomé Dossavi",
    Belarus: "@Xuan Tong",
    Ukraine: "@Xuan Tong",
    Poland: "@Xuan Tong",
    Lithuania: "@Kamilla Hinna",
    Latvia: "@Kamilla Hinna",
    Estonia: "@Kamilla Hinna",
    Seychelles: "@Salomé Dossavi",
    Mayotte: "@Salomé Dossavi",
    Mauritius: "@Salomé Dossavi",
    Madagascar: "@Salomé Dossavi",
    Comoros: "@Salomé Dossavi",
    "United States of America": "@Sara Martin / @David Mapela / @Brooke Forth",
    Canada: "@Sara Martin / @David Mapela / @Brooke Forth",
    "Saint Pierre and Miquelon": "@Salomé Dossavi",
    Greenland: "@Nihal Abubaker",
    "United States Minor Outlying Islands": "@Nihal Abubaker",
    "Western Sahara": "@Salomé Dossavi",
    Tunisia: "@Salomé Dossavi",
    Sudan: "@Salomé Dossavi",
    Morocco: "@Salomé Dossavi",
    Egypt: "@Salomé Dossavi",
    Algeria: "@Salomé Dossavi",
    Mongolia: "@Xuan Tong",
    Iceland: "@Nihal Abubaker",
    Sweden: "@Kamilla Hinna",
    Norway: "@Kamilla Hinna",
    Finland: "@Kamilla Hinna",
    "Faroe Islands": "@Kamilla Hinna",
    Denmark: "@Kamilla Hinna",
    "Wallis and Futuna": "@Salomé Dossavi",
    "New Caledonia": "@Salomé Dossavi",
    "French Polynesia": "@Salomé Dossavi",
    Vanuatu: "@Nihal Abubaker",
    Tuvalu: "@Nihal Abubaker",
    Tonga: "@Nihal Abubaker",
    Tokelau: "@Nihal Abubaker",
    "Solomon Islands": "@Nihal Abubaker",
    "Papua New Guinea": "@Nihal Abubaker",
    Palau: "@Nihal Abubaker",
    "Northern Mariana Islands": "@Nihal Abubaker",
    "Norfolk Island": "@Nihal Abubaker",
    Niue: "@Nihal Abubaker",
    "New Zealand": "@Nihal Abubaker",
    Nauru: "@Nihal Abubaker",
    "Micronesia (Federated States of)": "@Nihal Abubaker",
    "Marshall Islands": "@Nihal Abubaker",
    Kiribati: "@Nihal Abubaker",
    Guam: "@Nihal Abubaker",
    Fiji: "@Nihal Abubaker",
    "Cook Islands": "@Nihal Abubaker",
    Australia: "@Nihal Abubaker",
    "American Samoa": "@Nihal Abubaker",
    Venezuela: "@Sara Martin",
    Uruguay: "@Sara Martin",
    Suriname: "@Sara Martin",
    Peru: "@Sara Martin",
    Paraguay: "@Sara Martin",
    Guyana: "@Sara Martin",
    Ecuador: "@Sara Martin",
    Colombia: "@Sara Martin",
    Chile: "@Sara Martin",
    Brazil: "@Sara Martin",
    Bolivia: "@Sara Martin",
    Argentina: "@Sara Martin",
    "French Guiana": "@Salomé Dossavi",
    "Sri Lanka": "@Nihal Abubaker",
    Pakistan: "@Nihal Abubaker",
    Nepal: "@Nihal Abubaker",
    Maldives: "@Nihal Abubaker",
    India: "@Nihal Abubaker",
    "British Indian Ocean Territory": "@Nihal Abubaker",
    Bhutan: "@Nihal Abubaker",
    Bangladesh: "@Nihal Abubaker",
    Afghanistan: "@Nihal Abubaker",
    "Saint Helena, Ascension and Tristan da Cunha": "@Salomé Dossavi",
    "South Georgia and the South Sandwich Islands": "@Juliette Ploué",
    "Bouvet Island": "@Juliette Ploué",
    Vietnam: "@Xuan Tong",
    Thailand: "@Xuan Tong",
    Singapore: "@Xuan Tong",
    Philippines: "@Xuan Tong",
    Malaysia: "@Xuan Tong",
    Indonesia: "@Xuan Tong",
    "Cocos (Keeling) Islands": "@Xuan Tong",
    "Christmas Island": "@Xuan Tong",
    Cambodia: "@Xuan Tong",
    Romania: "@Xuan Tong",
    Bulgaria: "@Xuan Tong",
    Slovenia: "@Ginevra Bianchi",
    Montenegro: "@Ginevra Bianchi",
    Greece: "@Ginevra Bianchi",
    Croatia: "@Ginevra Bianchi",
    "Bosnia and Herzegovina": "@Ginevra Bianchi",
    Albania: "@Ginevra Bianchi",
    Yemen: "@Nihal Abubaker",
    "United Arab Emirates": "@Nihal Abubaker",
    Turkey: "@Nihal Abubaker",
    "Saudi Arabia": "@Nihal Abubaker",
    Qatar: "@Nihal Abubaker",
    Oman: "@Nihal Abubaker",
    Lebanon: "@Nihal Abubaker",
    Kuwait: "@Nihal Abubaker",
    Jordan: "@Nihal Abubaker",
    Israel: "@Nihal Abubaker",
    Iraq: "@Nihal Abubaker",
    Georgia: "@Nihal Abubaker",
    Bahrain: "@Nihal Abubaker",
    Azerbaijan: "@Nihal Abubaker",
    Armenia: "@Nihal Abubaker",
    Cyprus: "@Ginevra Bianchi",
    Spain: "@Ginevra Bianchi",
    Portugal: "@Ginevra Bianchi",
    Gibraltar: "@Ginevra Bianchi",
    Andorra: "@Ginevra Bianchi",
    Zimbabwe: "@Salomé Dossavi",
    Zambia: "@Salomé Dossavi",
    "South Africa": "@Salomé Dossavi",
    Namibia: "@Salomé Dossavi",
    Mozambique: "@Salomé Dossavi",
    Malawi: "@Salomé Dossavi",
    Lesotho: "@Salomé Dossavi",
    Eswatini: "@Salomé Dossavi",
    Botswana: "@Salomé Dossavi",
    Angola: "@Salomé Dossavi",
    "San Marino": "@Ginevra Bianchi",
    Malta: "@Ginevra Bianchi",
    Italy: "@Ginevra Bianchi",
    "Heard Island and McDonald Islands": "@Juliette Ploué",
    "Turks and Caicos Islands": "@Sara Martin",
    "Trinidad and Tobago": "@Sara Martin",
    "Saint Vincent and the Grenadines": "@Sara Martin",
    "Saint Lucia": "@Sara Martin",
    "Saint Kitts and Nevis": "@Sara Martin",
    "Puerto Rico": "@Sara Martin",
    Montserrat: "@Sara Martin",
    Jamaica: "@Sara Martin",
    Haiti: "@Sara Martin",
    Grenada: "@Sara Martin",
    "Dominican Republic": "@Sara Martin",
    Dominica: "@Sara Martin",
    Cuba: "@Sara Martin",
    "Cayman Islands": "@Sara Martin",
    Bermuda: "@Sara Martin",
    Barbados: "@Sara Martin",
    Aruba: "@Sara Martin",
    "Antigua and Barbuda": "@Sara Martin",
    Anguilla: "@Sara Martin",
    Martinique: "@Salomé Dossavi",
    Guadeloupe: "@Salomé Dossavi",
    Togo: "@Salomé Dossavi",
    "Sierra Leone": "@Salomé Dossavi",
    Senegal: "@Salomé Dossavi",
    "Sao Tome and Principe": "@Salomé Dossavi",
    Nigeria: "@Salomé Dossavi",
    Niger: "@Salomé Dossavi",
    Mauritania: "@Salomé Dossavi",
    Mali: "@Salomé Dossavi",
    Liberia: "@Salomé Dossavi",
    "Guinea-Bissau": "@Salomé Dossavi",
    Guinea: "@Salomé Dossavi",
    Ghana: "@Salomé Dossavi",
    Gabon: "@Salomé Dossavi",
    "Equatorial Guinea": "@Salomé Dossavi",
    Cameroon: "@Salomé Dossavi",
    "Cabo Verde": "@Salomé Dossavi",
    "Burkina Faso": "@Salomé Dossavi",
    Benin: "@Salomé Dossavi",
    Netherlands: "@Xuan Tong",
    Monaco: "@Salomé Dossavi",
    Luxembourg: "@Salomé Dossavi",
    France: "@Salomé Dossavi",
    Belgium: "@Salomé Dossavi",
    "United Kingdom": "@Nihal Abubaker",
    Jersey: "@Nihal Abubaker",
    Ireland: "@Nihal Abubaker",
    Guernsey: "@Nihal Abubaker",
    Germany: "@Nihal Abubaker",
    Russia: "@Xuan Tong",
    "Timor-Leste": "@Xuan Tong",
    Taiwan: "@Xuan Tong",
    "South Korea": "@Xuan Tong",
    Serbia: "@Xuan Tong",
    "North Macedonia": "@Xuan Tong",
    "North Korea": "@Xuan Tong",
    Myanmar: "@Xuan Tong",
    Moldova: "@Xuan Tong",
    Macao: "@Xuan Tong",
    Laos: "@Xuan Tong",
    "Hong Kong": "@Xuan Tong",
    Brunei: "@Xuan Tong",
    "Åland Islands": "@Xuan Tong",
    "Virgin Islands (U.S.)": "@Sara Martin",
    "Virgin Islands (British)": "@Sara Martin",
    "Falkland Islands [Malvinas]": "@Sara Martin",
    Curaçao: "@Sara Martin",
    "Bonaire, Sint Eustatius and Saba": "@Sara Martin",
    Bahamas: "@Sara Martin",
    Tanzania: "@Salomé Dossavi",
    "South Sudan": "@Salomé Dossavi",
    "Sint Maarten (Dutch part)": "@Salomé Dossavi",
    "Saint Martin (French part)": "@Salomé Dossavi",
    "Saint Barthélemy": "@Salomé Dossavi",
    Réunion: "@Salomé Dossavi",
    Libya: "@Salomé Dossavi",
    Gambia: "@Salomé Dossavi",
    "Côte d'Ivoire": "@Salomé Dossavi",
    "Congo (the Democratic Republic of the)": "@Salomé Dossavi",
    Congo: "@Salomé Dossavi",
    Syria: "@Nihal Abubaker",
    "Svalbard and Jan Mayen": "@Nihal Abubaker",
    Samoa: "@Nihal Abubaker",
    Pitcairn: "@Nihal Abubaker",
    "Palestine, State of": "@Nihal Abubaker",
    "Isle of Man": "@Nihal Abubaker",
    Iran: "@Nihal Abubaker",
    "French Southern Territories": "@Juliette Ploué",
    "Holy See": "@Ginevra Bianchi",
  };

  // Access Request Parsers
  const parseEmailData = useCallback((content, snippet) => {
    return {
      country: extractField(content, /Country:\s*([^\r\n]+)/i),
      email: extractField(snippet, /Email:\s*([^\s]+)/i),
      zipCode: extractField(content, /Zip Code:\s*([^\r\n]+)/i),
    };
  }, []); // Quote Request Parsers
  const parseQuoteRequestData = useCallback((content, snippet) => {
    return {
      qCompany: extractField(snippet, /Company:\s*([^\r\n]+)/i)
        .split("Full Name")[0]
        .trim(),
      qName: extractField(content, /Name:\s*([^\r\n]+)/i),
      qEmail: extractField(snippet, /Email:\s*([^\s]+)/i),
    };
  }, []);

  const parseNewSaleData = useCallback((content, snippet) => {
    return {
      nCompany: extractField(
        snippet,
        /Company([^-]+(?:-[^-]+)*?)(?:\s+-[a-f0-9-]+)/i
      ).trim(),
      nOrderNumber: extractField(content, /Order Number:\s*([^\r\n]+)/i),
    };
  }, []);

  const extractField = (text, regex) => {
    const match = text.match(regex);
    return match ? (match ? match[1].trim() : "N/A") : "N/A"; // Modified to return "N/A" if no match
  };

  const fetchEmails = useCallback(async () => {
    const token = localStorage.getItem("gmailAccessToken");
    if (!token) return;

    try {
      const response = await fetch(
        "https://www.googleapis.com/gmail/v1/users/me/messages?q=is:unread&maxResults=2000",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Further increased delay to avoid rate limiting

      await new Promise((resolve) => setTimeout(resolve, 3000)); // Further increased delay to avoid rate limiting

      const data = await response.json();

      if (!data.messages) return;

      const emailDetails = await Promise.all(
        data.messages.map(async (email) => {
          const emailRes = await fetch(
            `https://www.googleapis.com/gmail/v1/users/me/messages/${email.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const emailData = await emailRes.json();
          if (!emailData.payload) {
            console.error("Email data is missing payload:", emailData);
            return null; // Skip this email if payload is missing
          }
          const subject =
            emailData.payload.headers.find((h) => h.name === "Subject")
              ?.value || "";
          const body = decodeEmailBody(emailData.payload);
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Increased delay to avoid rate limiting

          if (subject === "Access Request") {
            return {
              id: email.id,
              subject,
              snippet: body || emailData.snippet,
              data: parseEmailData(body, emailData.snippet),
            };
          }

          if (subject === "User Request Quote") {
            return {
              id: email.id,
              subject,
              snippet: body || emailData.snippet,
              data: parseQuoteRequestData(body, emailData.snippet),
            };
          }

          if (subject === "New Sale") {
            return {
              id: email.id,
              subject,
              snippet: body || emailData.snippet,
              data: parseNewSaleData(body, emailData.snippet),
            };
          }

          return null;
        })
      );

      setEmails(emailDetails.filter(Boolean));
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  }, [parseEmailData, parseQuoteRequestData, parseNewSaleData]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  const decodeEmailBody = (payload) => {
    if (payload.parts) {
      return payload.parts
        .map((part) =>
          part.body.data
            ? atob(part.body.data.replace(/-/g, "+").replace(/_/g, "/"))
            : ""
        )
        .join("");
    } else if (payload.body?.data) {
      return atob(payload.body.data.replace(/-/g, "+").replace(/_/g, "/"));
    }
    return "";
  };

  // Separate email types
  const accessRequests = emails.filter((e) => e.subject === "Access Request");
  const quoteRequests = emails.filter(
    (e) => e.subject === "User Request Quote"
  );
  const newSales = emails.filter((e) => e.subject === "New Sale");

  const getCountryCode = (countryName) => {
    const cleanedCountryName = countryName?.replace(/\*\*Â/g, "").trim(); // Clean the input
    return countryCodes[cleanedCountryName] || countryName || "N/A"; // Return "N/A" if no match
  };

  const getKAM = (countryName) => {
    const cleanedCountryName = countryName?.replace(/\*\*Â/g, "").trim(); // Clean the input
    return kamName[cleanedCountryName] || "N/A"; // Return "N/A" if no match
  };
  const renderEmailList = (emailList, type) => (
    <div style={{ marginTop: "50px" }}>
      {emailList.map((email) => {
        let countryCode = "N/A";
        let kam = "N/A"; // Default value

        if (type === "access") {
          // Extract, clean, and get the country code
          const cleanedCountry = email.data.country
            ?.replace(/\*\*Â/g, "")
            .trim();
          countryCode = getCountryCode(cleanedCountry);
          kam = getKAM(cleanedCountry);

          // Debugging logs
          console.log("Raw Country:", email.data.country);
          console.log("Cleaned Country:", cleanedCountry);
          console.log("Country Code:", countryCode);
          console.log("KAM:", kam);
        }

        return (
          <div
            key={email.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
            onClick={() => setSelectedEmail(email)}
          >
            <div>
              {type === "access" && (
                <>
                  :{countryCode}: -{email.data.email.replace(/\*\*Â/g, "")} /{" "}
                  {kam} - {email.data.country.replace(/\*\*Â/g, "")} -{" "}
                  {email.data.zipCode.replace(/\*\*Â/g, "")}
                </>
              )}
              {type === "quote" && (
                <>
                  {email.data.qCompany.replace(/&#39;/g, " '")} -{" "}
                  {email.data.qName.replace(/\*\*Â/g, "")} /{" "}
                  {email.data.qEmail.replace(/\*\*Â/g, "")}
                </>
              )}
              {type === "sale" && (
                <>
                  {email.data.nCompany.replace(/:/g, "")} -{" "}
                  {email.data.nOrderNumber.replace(/Â/g, "")} / @KAM{" "}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      <h3 style={{ marginTop: "220px" }}>Access Request</h3>
      {renderEmailList(accessRequests, "access")}

      <h3 style={{ marginTop: "50px" }}>Quote Request</h3>
      {renderEmailList(quoteRequests, "quote")}

      <h3 style={{ marginTop: "50px" }}>New Sales</h3>
      {renderEmailList(newSales, "sale")}

      {selectedEmail && (
        <div
          style={{
            marginLeft: "0px",
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <h4>Full Email Details</h4>
          <div style={{ marginTop: "10px" }}>
            {selectedEmail.subject === "Access Request" && (
              <>
                <div>
                  <strong>Country:</strong> {selectedEmail.data.country}
                </div>
                <div>
                  <strong>Email:</strong> {selectedEmail.data.email}
                </div>
                <div>
                  <strong>Zip Code:</strong> {selectedEmail.data.zipCode}
                </div>
              </>
            )}
            {selectedEmail.subject === "User Request Quote" && (
              <>
                <div>
                  <strong>Company:</strong> {selectedEmail.data.qCompany}
                </div>
                <div>
                  <strong>Email:</strong> {selectedEmail.data.qEmail}
                </div>
                <div>
                  <strong>Name:</strong> {selectedEmail.data.qName}
                </div>
              </>
            )}
            {selectedEmail.subject === "New Sale" && (
              <>
                <div>
                  <strong>Company:</strong> {selectedEmail.data.nCompany}
                </div>
                <div>
                  <strong>Order Number:</strong>
                  {""}

                  {selectedEmail.data.nOrderNumber}
                </div>
              </>
            )}
          </div>
          <pre
            style={{
              backgroundColor: "black",
              marginTop: "20px",
              padding: "1px",
            }}
          ></pre>
        </div>
      )}
    </div>
  );
};

export default B2BAutomations;
