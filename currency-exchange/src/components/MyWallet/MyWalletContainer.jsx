import { useEffect, useState } from "react";
import {  getWalletData, addWalletData } from "./airTableApi";
import MyCurrencyCard from "./MyCurrencyCard";


export default function MyWalletContainer () {
    const [currencies, setCurrencies] = useState([])
    const [baseCurrency, setBaseCurrency] = useState("")
    const [selectedCurrency, setSelectedCurrency] = useState("")
    const [depositAmount, setDepositAmount] = useState("");
    const [spendAmount, setSpendAmount] = useState("");
    const [rate, setRate] = useState("");
    const [walletData, setWalletData] = useState([]);
    const [totalCurrencyValue, setTotalCurrencyValue] = useState({})
    const [exchangeRates, setExchangeRates] = useState([])
    const [totalBaseCurrencyValue, setTotalBaseCurrencyValue] = useState(0);

    

    useEffect(() => {
      const fetchData = async () => {
        const data = await getWalletData();
        setWalletData(data);

        const totalValue = {};
        data.records.forEach((record) => {
          const currency = record.fields.currency;
          const total = record.fields.total;
          if (totalValue[currency]) {
            totalValue[currency] += total;
          } else {
            totalValue[currency] = total;
          }
        });
        setTotalCurrencyValue(totalValue);
      };
      fetchData();
    }, [walletData]);



    useEffect(() => {
        const fetchCurrencies = async () => {
          const response = await fetch(
            `https://api.frankfurter.app/latest`
          );
          const data = await response.json();
          setCurrencies([data.base, ...Object.keys(data.rates)]);
          setBaseCurrency(data.base)
          setExchangeRates(data.rates);
        };
        fetchCurrencies();
      }, []);

      useEffect(() => {
        if (baseCurrency === selectedCurrency) {
          setRate(1);
        } else if (baseCurrency && selectedCurrency) {
          const fetchExchangeRates = async () => {
            const response = await fetch(
              `https://api.frankfurter.app/latest?from=${baseCurrency}&to=${selectedCurrency}`
            );
            const data = await response.json();
            setRate(data.rates[selectedCurrency]);
            }
          fetchExchangeRates();
          }
        }, [baseCurrency, selectedCurrency]);

        

        const handleAddCurrency = async () => {
              if (selectedCurrency && baseCurrency) {
                const totalInBase = (depositAmount - spendAmount) / rate;
                const total = depositAmount - spendAmount
              await addWalletData({
                currency: selectedCurrency,
                rate: rate, 
                base: baseCurrency,
                deposit: depositAmount,
                spend: spendAmount,
                totalinbase: totalInBase,
                total: total,
              });
              setSelectedCurrency("");
              setDepositAmount("");
              setSpendAmount("");
              setRate("");
              }
        };
        

      const handleNewCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value)
      }

      const handleBaseCurrencyChange =(event) => {
        setBaseCurrency(event.target.value)
      }
      
      const handleDepositChange = (event) => {
        const value = event.target.value;
        setDepositAmount(parseFloat(value));
      };
    
      const handleSpendChange = (event) => {
        const value = event.target.value;
        setSpendAmount(parseFloat(value));
      };

      
      useEffect(() => {
        const calculateTotalBaseCurrencyValue = () => {
          let totalBaseValue = 0;
    
          for (const [currency, total] of Object.entries(totalCurrencyValue)) {
            if (exchangeRates[currency]) {
              if (currency === baseCurrency) {
                totalBaseValue += total; 
              } else {
                const exchangeRate = exchangeRates[currency];
                totalBaseValue += total / exchangeRate;
              }
            } else {
              totalBaseValue += total;
            }
          }
          return totalBaseValue;
        };
        const newTotalBaseCurrencyValue = calculateTotalBaseCurrencyValue();
        setTotalBaseCurrencyValue(newTotalBaseCurrencyValue);
      }, [totalCurrencyValue, exchangeRates, baseCurrency]);
      
    return (
        <div>
        <h1>My Wallet</h1>
        <div>Base Currency
        <select value={baseCurrency} onChange={handleBaseCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        </div>
        <h2>Total Amount in {baseCurrency} = {totalBaseCurrencyValue.toFixed(2)}</h2>
        <h2>Exchange Rate: 1{baseCurrency} - {rate}{selectedCurrency}</h2>
        <select
            value={selectedCurrency}
            onChange={handleNewCurrencyChange}
            >
                <option value="">Select a currency</option>
                {currencies.map((option) => (
                    <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        <input
          type="number"
          placeholder="Deposit amount"
          value={depositAmount}
          onChange={handleDepositChange}
        />
        <input
          type="number"
          placeholder="Spend amount"
          value={spendAmount}
          onChange={handleSpendChange}
        />
        <button onClick={handleAddCurrency}>Add Currency</button>
        <div>
        {Object.entries(totalCurrencyValue).map(([currency, total]) => (
            <MyCurrencyCard
              key={currency}
              currency={currency}
              totalCurrencyValue={total}
            />
          ))}
        </div>
    </div>
        
    )
}