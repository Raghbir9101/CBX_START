import React, { useState, useEffect } from "react";
import "./CurrencyConverter.css"; // Import CSS file for styling
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { IconButton } from "@mui/material";
import { ElementWrapper } from "../Page/Page";

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

  return (
    <>
      <ElementWrapper provided={provided} item={item}>
        <div className="currency-converter">
          <div className="currency">
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
          <IconButton className="swap-button" onClick={handleSwapCurrencies}>
            <SwapVertIcon />
          </IconButton>
          <br />
          <div className="currency">
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
