import React, { useState, useEffect } from "react";
import "./CurrencyConverter.css"; // Import CSS file for styling
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { IconButton } from "@mui/material";
import { ElementWrapper } from "../Page/Page";
import Flag from "react-world-flags";
import { AutoComplete, Input } from 'antd';

const CurrencyConverter = ({ provided, item, handleDelete, data, onChange, pageMetaData }) => {
  const [inputCurrency, setInputCurrency] = useState("EUR");
  const [outputCurrency, setOutputCurrency] = useState("USD");
  const [inputAmount, setInputAmount] = useState(1);
  const [outputAmount, setOutputAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [collapsed, setCollapsed] = useState(data?.collapsed);
  // const currencyOptions = [
  //   { code: "AED", name: "United Arab Emirates Dirham" },
  //   { code: "ARS", name: "Argentine Peso" },
  //   { code: "AUD", name: "Australian Dollar" },
  //   { code: "BGN", name: "Bulgarian Lev" },
  //   { code: "BRL", name: "Brazilian Real" },
  //   { code: "BSD", name: "Bahamian Dollar" },
  //   { code: "CAD", name: "Canadian Dollar" },
  //   { code: "CHF", name: "Swiss Franc" },
  //   { code: "CLP", name: "Chilean Peso" },
  //   { code: "CNY", name: "Chinese Yuan" },
  //   { code: "COP", name: "Colombian Peso" },
  //   { code: "CZK", name: "Czech Koruna" },
  //   { code: "DKK", name: "Danish Krone" },
  //   { code: "DOP", name: "Dominican Peso" },
  //   { code: "EGP", name: "Egyptian Pound" },
  //   { code: "EUR", name: "Euro" },
  //   { code: "FJD", name: "Fijian Dollar" },
  //   { code: "GBP", name: "British Pound Sterling" },
  //   { code: "GTQ", name: "Guatemalan Quetzal" },
  //   { code: "HKD", name: "Hong Kong Dollar" },
  //   { code: "HRK", name: "Croatian Kuna" },
  //   { code: "HUF", name: "Hungarian Forint" },
  //   { code: "IDR", name: "Indonesian Rupiah" },
  //   { code: "ILS", name: "Israeli New Shekel" },
  //   { code: "INR", name: "Indian Rupee" },
  //   { code: "ISK", name: "Icelandic Krona" },
  //   { code: "JPY", name: "Japanese Yen" },
  //   { code: "KRW", name: "South Korean Won" },
  //   { code: "KZT", name: "Kazakhstani Tenge" },
  //   { code: "MXN", name: "Mexican Peso" },
  //   { code: "MYR", name: "Malaysian Ringgit" },
  //   { code: "NOK", name: "Norwegian Krone" },
  //   { code: "NZD", name: "New Zealand Dollar" },
  //   { code: "PAB", name: "Panamanian Balboa" },
  //   { code: "PEN", name: "Peruvian Nuevo Sol" },
  //   { code: "PHP", name: "Philippine Peso" },
  //   { code: "PKR", name: "Pakistani Rupee" },
  //   { code: "PLN", name: "Polish Zloty" },
  //   { code: "PYG", name: "Paraguayan Guarani" },
  //   { code: "RON", name: "Romanian Leu" },
  //   { code: "RUB", name: "Russian Ruble" },
  //   { code: "SAR", name: "Saudi Riyal" },
  //   { code: "SEK", name: "Swedish Krona" },
  //   { code: "SGD", name: "Singapore Dollar" },
  //   { code: "THB", name: "Thai Baht" },
  //   { code: "TRY", name: "Turkish Lira" },
  //   { code: "TWD", name: "New Taiwan Dollar" },
  //   { code: "UAH", name: "Ukrainian Hryvnia" },
  //   { code: "USD", name: "United States Dollar" },
  //   { code: "UYU", name: "Uruguayan Peso" },
  //   { code: "VND", name: "Vietnamese Dong" },
  //   { code: "ZAR", name: "South African Rand" },
  // ];
  const currencyOptions = [
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "AFN", name: "Afghan Afghani" },
    { code: "ALL", name: "Albanian Lek" },
    { code: "AMD", name: "Armenian Dram" },
    { code: "ANG", name: "Netherlands Antillean Guilder" },
    { code: "AOA", name: "Angolan Kwanza" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "AWG", name: "Aruban Florin" },
    { code: "AZN", name: "Azerbaijani Manat" },
    { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark" },
    { code: "BBD", name: "Barbadian Dollar" },
    { code: "BDT", name: "Bangladeshi Taka" },
    { code: "BGN", name: "Bulgarian Lev" },
    { code: "BHD", name: "Bahraini Dinar" },
    { code: "BIF", name: "Burundian Franc" },
    { code: "BMD", name: "Bermudian Dollar" },
    { code: "BND", name: "Brunei Dollar" },
    { code: "BOB", name: "Bolivian Boliviano" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "BSD", name: "Bahamian Dollar" },
    { code: "BTN", name: "Bhutanese Ngultrum" },
    { code: "BWP", name: "Botswana Pula" },
    { code: "BYN", name: "Belarusian Ruble" },
    { code: "BZD", name: "Belize Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CDF", name: "Congolese Franc" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "COP", name: "Colombian Peso" },
    { code: "CRC", name: "Costa Rican Colón" },
    { code: "CUP", name: "Cuban Peso" },
    { code: "CVE", name: "Cape Verdean Escudo" },
    { code: "CZK", name: "Czech Koruna" },
    { code: "DJF", name: "Djiboutian Franc" },
    { code: "DKK", name: "Danish Krone" },
    { code: "DOP", name: "Dominican Peso" },
    { code: "DZD", name: "Algerian Dinar" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "ERN", name: "Eritrean Nakfa" },
    { code: "ETB", name: "Ethiopian Birr" },
    { code: "EUR", name: "Euro" },
    { code: "FJD", name: "Fijian Dollar" },
    { code: "FKP", name: "Falkland Islands Pound" },
    { code: "FOK", name: "Faroese Króna" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "GEL", name: "Georgian Lari" },
    { code: "GGP", name: "Guernsey Pound" },
    { code: "GHS", name: "Ghanaian Cedi" },
    { code: "GIP", name: "Gibraltar Pound" },
    { code: "GMD", name: "Gambian Dalasi" },
    { code: "GNF", name: "Guinean Franc" },
    { code: "GTQ", name: "Guatemalan Quetzal" },
    { code: "GYD", name: "Guyanese Dollar" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "HNL", name: "Honduran Lempira" },
    { code: "HRK", name: "Croatian Kuna" },
    { code: "HTG", name: "Haitian Gourde" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "ILS", name: "Israeli New Shekel" },
    { code: "IMP", name: "Isle of Man Pound" },
    { code: "INR", name: "Indian Rupee" },
    { code: "IQD", name: "Iraqi Dinar" },
    { code: "IRR", name: "Iranian Rial" },
    { code: "ISK", name: "Icelandic Króna" },
    { code: "JEP", name: "Jersey Pound" },
    { code: "JMD", name: "Jamaican Dollar" },
    { code: "JOD", name: "Jordanian Dinar" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "KES", name: "Kenyan Shilling" },
    { code: "KGS", name: "Kyrgyzstani Som" },
    { code: "KHR", name: "Cambodian Riel" },
    { code: "KID", name: "Kiribati Dollar" },
    { code: "KMF", name: "Comorian Franc" },
    { code: "KRW", name: "South Korean Won" },
    { code: "KWD", name: "Kuwaiti Dinar" },
    { code: "KYD", name: "Cayman Islands Dollar" },
    { code: "KZT", name: "Kazakhstani Tenge" },
    { code: "LAK", name: "Lao Kip" },
    { code: "LBP", name: "Lebanese Pound" },
    { code: "LKR", name: "Sri Lankan Rupee" },
    { code: "LRD", name: "Liberian Dollar" },
    { code: "LSL", name: "Lesotho Loti" },
    { code: "LYD", name: "Libyan Dinar" },
    { code: "MAD", name: "Moroccan Dirham" },
    { code: "MDL", name: "Moldovan Leu" },
    { code: "MGA", name: "Malagasy Ariary" },
    { code: "MKD", name: "Macedonian Denar" },
    { code: "MMK", name: "Burmese Kyat" },
    { code: "MNT", name: "Mongolian Tögrög" },
    { code: "MOP", name: "Macanese Pataca" },
    { code: "MRU", name: "Mauritanian Ouguiya" },
    { code: "MUR", name: "Mauritian Rupee" },
    { code: "MVR", name: "Maldivian Rufiyaa" },
    { code: "MWK", name: "Malawian Kwacha" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "MZN", name: "Mozambican Metical" },
    { code: "NAD", name: "Namibian Dollar" },
    { code: "NGN", name: "Nigerian Naira" },
    { code: "NIO", name: "Nicaraguan Córdoba" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "NPR", name: "Nepalese Rupee" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "OMR", name: "Omani Rial" },
    { code: "PAB", name: "Panamanian Balboa" },
    { code: "PEN", name: "Peruvian Nuevo Sol" },
    { code: "PGK", name: "Papua New Guinean Kina" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "PLN", name: "Polish Zloty" },
    { code: "PYG", name: "Paraguayan Guarani" },
    { code: "QAR", name: "Qatari Riyal" },
    { code: "RON", name: "Romanian Leu" },
    { code: "RSD", name: "Serbian Dinar" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "RWF", name: "Rwandan Franc" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "SBD", name: "Solomon Islands Dollar" },
    { code: "SCR", name: "Seychellois Rupee" },
    { code: "SDG", name: "Sudanese Pound" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "SHP", name: "Saint Helena Pound" },
    { code: "SLL", name: "Sierra Leonean Leone" },
    { code: "SOS", name: "Somali Shilling" },
    { code: "SRD", name: "Surinamese Dollar" },
    { code: "SSP", name: "South Sudanese Pound" },
    { code: "STN", name: "São Tomé and Príncipe Dobra" },
    { code: "SYP", name: "Syrian Pound" },
    { code: "SZL", name: "Swazi Lilangeni" },
    { code: "THB", name: "Thai Baht" },
    { code: "TJS", name: "Tajikistani Somoni" },
    { code: "TMT", name: "Turkmenistani Manat" },
    { code: "TND", name: "Tunisian Dinar" },
    { code: "TOP", name: "Tongan Paʻanga" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "TTD", name: "Trinidad and Tobago Dollar" },
    { code: "TVD", name: "Tuvaluan Dollar" },
    { code: "TWD", name: "New Taiwan Dollar" },
    { code: "TZS", name: "Tanzanian Shilling" },
    { code: "UAH", name: "Ukrainian Hryvnia" },
    { code: "UGX", name: "Ugandan Shilling" },
    { code: "USD", name: "United States Dollar" },
    { code: "UYU", name: "Uruguayan Peso" },
    { code: "UZS", name: "Uzbekistani Soʻm" },
    { code: "VES", name: "Venezuelan Bolívar Soberano" },
    { code: "VND", name: "Vietnamese Dong" },
    { code: "VUV", name: "Vanuatu Vatu" },
    { code: "WST", name: "Samoan Tālā" },
    { code: "XAF", name: "Central African CFA Franc" },
    { code: "XCD", name: "East Caribbean Dollar" },
    { code: "XOF", name: "West African CFA Franc" },
    { code: "XPF", name: "CFP Franc" },
    { code: "YER", name: "Yemeni Rial" },
    { code: "ZAR", name: "South African Rand" },
    { code: "ZMW", name: "Zambian Kwacha" },
    { code: "ZWL", name: "Zimbabwean Dollar" },
  ];




  const [options, setOptions] = useState(currencyOptions || []);
  useEffect(() => {
    compute();
  }, [inputCurrency, outputCurrency, inputAmount]);

  const handleSwapCurrencies = () => {
    const temp = inputCurrency;
    setInputCurrency(outputCurrency);
    setOutputCurrency(temp);
  };

  const compute = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${inputCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        const new_rate = data.rates[outputCurrency];
        setExchangeRate(new_rate);
        setOutputAmount((inputAmount * new_rate).toFixed(2));
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  // const getCountryCode = (currency) => {
  //   const currencyCountryMap = {
  //     AED: "AE",
  //     ARS: "AR",
  //     AUD: "AU",
  //     BGN: "BG",
  //     BRL: "BR",
  //     BSD: "BS",
  //     CAD: "CA",
  //     CHF: "CH",
  //     CLP: "CL",
  //     CNY: "CN",
  //     COP: "CO",
  //     CZK: "CZ",
  //     DKK: "DK",
  //     DOP: "DO",
  //     EGP: "EG",
  //     EUR: "EU",
  //     FJD: "FJ",
  //     GBP: "GB",
  //     GTQ: "GT",
  //     HKD: "HK",
  //     HRK: "HR",
  //     HUF: "HU",
  //     IDR: "ID",
  //     ILS: "IL",
  //     INR: "IN",
  //     ISK: "IS",
  //     JPY: "JP",
  //     KRW: "KR",
  //     KZT: "KZ",
  //     MXN: "MX",
  //     MYR: "MY",
  //     NOK: "NO",
  //     NZD: "NZ",
  //     PAB: "PA",
  //     PEN: "PE",
  //     PHP: "PH",
  //     PKR: "PK",
  //     PLN: "PL",
  //     PYG: "PY",
  //     RON: "RO",
  //     RUB: "RU",
  //     SAR: "SA",
  //     SEK: "SE",
  //     SGD: "SG",
  //     THB: "TH",
  //     TRY: "TR",
  //     TWD: "TW",
  //     UAH: "UA",
  //     USD: "US",
  //     UYU: "UY",
  //     VND: "VN",
  //     ZAR: "ZA",
  //   };
  //   return currencyCountryMap[currency] || "UN";
  // };

  const getCountryCode = (currency) => {
    const currencyCountryMap = {
      AED: "AE",
      AFN: "AF",
      ALL: "AL",
      AMD: "AM",
      ANG: "AN",
      AOA: "AO",
      ARS: "AR",
      AUD: "AU",
      AWG: "AW",
      AZN: "AZ",
      BAM: "BA",
      BBD: "BB",
      BDT: "BD",
      BGN: "BG",
      BHD: "BH",
      BIF: "BI",
      BMD: "BM",
      BND: "BN",
      BOB: "BO",
      BRL: "BR",
      BSD: "BS",
      BTN: "BT",
      BWP: "BW",
      BYN: "BY",
      BZD: "BZ",
      CAD: "CA",
      CDF: "CD",
      CHF: "CH",
      CLP: "CL",
      CNY: "CN",
      COP: "CO",
      CRC: "CR",
      CUP: "CU",
      CVE: "CV",
      CZK: "CZ",
      DJF: "DJ",
      DKK: "DK",
      DOP: "DO",
      DZD: "DZ",
      EGP: "EG",
      ERN: "ER",
      ETB: "ET",
      EUR: "EU",
      FJD: "FJ",
      FKP: "FK",
      FOK: "FO",
      GBP: "GB",
      GEL: "GE",
      GGP: "GG",
      GHS: "GH",
      GIP: "GI",
      GMD: "GM",
      GNF: "GN",
      GTQ: "GT",
      GYD: "GY",
      HKD: "HK",
      HNL: "HN",
      HRK: "HR",
      HTG: "HT",
      HUF: "HU",
      IDR: "ID",
      ILS: "IL",
      IMP: "IM",
      INR: "IN",
      IQD: "IQ",
      IRR: "IR",
      ISK: "IS",
      JEP: "JE",
      JMD: "JM",
      JOD: "JO",
      JPY: "JP",
      KES: "KE",
      KGS: "KG",
      KHR: "KH",
      KID: "KI",
      KMF: "KM",
      KRW: "KR",
      KWD: "KW",
      KYD: "KY",
      KZT: "KZ",
      LAK: "LA",
      LBP: "LB",
      LKR: "LK",
      LRD: "LR",
      LSL: "LS",
      LYD: "LY",
      MAD: "MA",
      MDL: "MD",
      MGA: "MG",
      MKD: "MK",
      MMK: "MM",
      MNT: "MN",
      MOP: "MO",
      MRU: "MR",
      MUR: "MU",
      MVR: "MV",
      MWK: "MW",
      MXN: "MX",
      MYR: "MY",
      MZN: "MZ",
      NAD: "NA",
      NGN: "NG",
      NIO: "NI",
      NOK: "NO",
      NPR: "NP",
      NZD: "NZ",
      OMR: "OM",
      PAB: "PA",
      PEN: "PE",
      PGK: "PG",
      PHP: "PH",
      PKR: "PK",
      PLN: "PL",
      PYG: "PY",
      QAR: "QA",
      RON: "RO",
      RSD: "RS",
      RUB: "RU",
      RWF: "RW",
      SAR: "SA",
      SBD: "SB",
      SCR: "SC",
      SDG: "SD",
      SEK: "SE",
      SGD: "SG",
      SHP: "SH",
      SLL: "SL",
      SOS: "SO",
      SRD: "SR",
      SSP: "SS",
      STN: "ST",
      SYP: "SY",
      SZL: "SZ",
      THB: "TH",
      TJS: "TJ",
      TMT: "TM",
      TND: "TN",
      TOP: "TO",
      TRY: "TR",
      TTD: "TT",
      TVD: "TV",
      TWD: "TW",
      TZS: "TZ",
      UAH: "UA",
      UGX: "UG",
      USD: "US",
      UYU: "UY",
      UZS: "UZ",
      VES: "VE",
      VND: "VN",
      VUV: "VU",
      WST: "WS",
      XAF: "XA",
      XCD: "XC",
      XOF: "XO",
      XPF: "XP",
      YER: "YE",
      ZAR: "ZA",
      ZMW: "ZM",
      ZWL: "ZW",
    };
    return currencyCountryMap[currency] || "UN";
  };


  const onSearch = (searchText) => {
    const filteredOptions = currencyOptions.filter(
      (option) =>
        option.name.toLowerCase().includes(searchText.toLowerCase()) ||
        option.code.toLowerCase().includes(searchText.toLowerCase())
    );
    setOptions(filteredOptions);
  };

  const onSelect = (value) => {
    setInputCurrency(value);
  };

  const onSelectOutput = (value) => {
    setOptions(currencyOptions)
    setOutputCurrency(value);
  };

  useEffect(() => {
    onChange({ collapsed });
  }, [collapsed]);
  
  return (
    <>
      <ElementWrapper editable={(pageMetaData.role == "OWNER" || pageMetaData.role == "EDITOR")}  handleDelete={handleDelete} provided={provided} item={item}  collapsed={data?.collapsed} setCollapsed={setCollapsed}>
        <div className="currency-converter">
          <div className="currency">
            <Flag
              code={getCountryCode(inputCurrency)}
              className="currency-flag"
            />
            <AutoComplete
              options={options.map(option => ({ value: option.code, label: `${option.name} (${option.code})` }))}
              style={{ width: 100 }}
              onSelect={onSelect}
              key={inputCurrency}
              defaultValue={inputCurrency}
              onSearch={onSearch}
              placeholder="Select input currency"
            />

            <Input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              className="amount-input"
            />
          </div>
          <IconButton sx={{ mb: 1 }} onClick={handleSwapCurrencies}>
            <SwapVertIcon />
          </IconButton>
          <div className="currency">
            <Flag
              code={getCountryCode(outputCurrency)}
              className="currency-flag"
            />
            <AutoComplete
              defaultValue={outputCurrency}
              options={options.map(option => ({ value: option.code, label: `${option.name} (${option.code})` }))}
              style={{ width: 100 }}
              key={outputCurrency}
              onSelect={onSelectOutput}
              onSearch={onSearch}
              placeholder="Select output currency"
            />
            <Input
              type="number"
              value={outputAmount}
              readOnly
              className="amount-input"
            />
          </div>
          <div className="result">
            <div className="rate">
              1 {inputCurrency} = {exchangeRate} {outputCurrency}
            </div>
          </div>
        </div>
      </ElementWrapper>
    </>
  );
};

export default CurrencyConverter;
