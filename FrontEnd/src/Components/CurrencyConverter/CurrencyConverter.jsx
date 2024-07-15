import React, { useState, useEffect } from "react";
import "./CurrencyConverter.css"; // Import CSS file for styling
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { IconButton } from "@mui/material";
import { ElementWrapper } from "../Page/Page";
import Flag from "react-world-flags";
import { AutoComplete, Input } from 'antd';

const CurrencyConverter = ({ provided, item, handleDelete }) => {
  const [inputCurrency, setInputCurrency] = useState("EUR");
  const [outputCurrency, setOutputCurrency] = useState("USD");
  const [inputAmount, setInputAmount] = useState(1);
  const [outputAmount, setOutputAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);

  const currencyOptions = [
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "BGN", name: "Bulgarian Lev" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "BSD", name: "Bahamian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "COP", name: "Colombian Peso" },
    { code: "CZK", name: "Czech Koruna" },
    { code: "DKK", name: "Danish Krone" },
    { code: "DOP", name: "Dominican Peso" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "EUR", name: "Euro" },
    { code: "FJD", name: "Fijian Dollar" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "GTQ", name: "Guatemalan Quetzal" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "HRK", name: "Croatian Kuna" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "ILS", name: "Israeli New Shekel" },
    { code: "INR", name: "Indian Rupee" },
    { code: "ISK", name: "Icelandic Krona" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "KRW", name: "South Korean Won" },
    { code: "KZT", name: "Kazakhstani Tenge" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "PAB", name: "Panamanian Balboa" },
    { code: "PEN", name: "Peruvian Nuevo Sol" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "PLN", name: "Polish Zloty" },
    { code: "PYG", name: "Paraguayan Guarani" },
    { code: "RON", name: "Romanian Leu" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "THB", name: "Thai Baht" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "TWD", name: "New Taiwan Dollar" },
    { code: "UAH", name: "Ukrainian Hryvnia" },
    { code: "USD", name: "United States Dollar" },
    { code: "UYU", name: "Uruguayan Peso" },
    { code: "VND", name: "Vietnamese Dong" },
    { code: "ZAR", name: "South African Rand" },
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

  const getCountryCode = (currency) => {
    const currencyCountryMap = {
      AED: "AE",
      ARS: "AR",
      AUD: "AU",
      BGN: "BG",
      BRL: "BR",
      BSD: "BS",
      CAD: "CA",
      CHF: "CH",
      CLP: "CL",
      CNY: "CN",
      COP: "CO",
      CZK: "CZ",
      DKK: "DK",
      DOP: "DO",
      EGP: "EG",
      EUR: "EU",
      FJD: "FJ",
      GBP: "GB",
      GTQ: "GT",
      HKD: "HK",
      HRK: "HR",
      HUF: "HU",
      IDR: "ID",
      ILS: "IL",
      INR: "IN",
      ISK: "IS",
      JPY: "JP",
      KRW: "KR",
      KZT: "KZ",
      MXN: "MX",
      MYR: "MY",
      NOK: "NO",
      NZD: "NZ",
      PAB: "PA",
      PEN: "PE",
      PHP: "PH",
      PKR: "PK",
      PLN: "PL",
      PYG: "PY",
      RON: "RO",
      RUB: "RU",
      SAR: "SA",
      SEK: "SE",
      SGD: "SG",
      THB: "TH",
      TRY: "TR",
      TWD: "TW",
      UAH: "UA",
      USD: "US",
      UYU: "UY",
      VND: "VN",
      ZAR: "ZA",
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

  return (
    <>
      <ElementWrapper handleDelete={handleDelete} provided={provided} item={item}>
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
