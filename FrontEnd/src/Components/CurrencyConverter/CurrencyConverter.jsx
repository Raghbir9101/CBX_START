import React, { useState, useEffect } from "react";
import "./CurrencyConverter.css"; // Import CSS file for styling
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { IconButton } from "@mui/material";
import { ElementWrapper } from "../Page/Page";
import Flag from "react-world-flags";

const CurrencyConverter = ({ provided, item }) => {
  const [inputCurrency, setInputCurrency] = useState("EUR");
  const [outputCurrency, setOutputCurrency] = useState("USD");
  const [inputAmount, setInputAmount] = useState(1);
  const [outputAmount, setOutputAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);

  const currencyOptions = [
    "AED",
    "ARS",
    "AUD",
    "BGN",
    "BRL",
    "BSD",
    "CAD",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CZK",
    "DKK",
    "DOP",
    "EGP",
    "EUR",
    "FJD",
    "GBP",
    "GTQ",
    "HKD",
    "HRK",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "ISK",
    "JPY",
    "KRW",
    "KZT",
    "MXN",
    "MYR",
    "NOK",
    "NZD",
    "PAB",
    "PEN",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "RON",
    "RUB",
    "SAR",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "TWD",
    "UAH",
    "USD",
    "UYU",
    "VND",
    "ZAR",
  ];

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

  return (
    <>
      <ElementWrapper provided={provided} item={item}>
        <div className="currency-converter">
          <div className="currency">
            <Flag
              code={getCountryCode(inputCurrency)}
              className="currency-flag"
            />
            <select
              value={inputCurrency}
              onChange={(e) => setInputCurrency(e.target.value)}
              className="currency-select"
            >
              {currencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
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
            <select
              value={outputCurrency}
              onChange={(e) => setOutputCurrency(e.target.value)}
              className="currency-select"
            >
              {currencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
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
