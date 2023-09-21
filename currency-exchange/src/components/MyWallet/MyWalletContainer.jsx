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
          setExchangeRates({...data.rates, [data.base]: 1});
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
              deposit: depositAmount || 0,
              spend: spendAmount || 0,
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
              if (currency !== baseCurrency) {
                totalBaseValue += (total / exchangeRates[currency]) * exchangeRates[baseCurrency];
              } else {
                totalBaseValue += total;
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
      <div className="bg-sky-100 border-solid border-2 border-teal-200 rounded-lg max-w-sm">
        <div>
        <h1 className="bg-blue-950 rounded-lg text-white font-bold tracking-wide flex-auto text-4xl font-semibold text-slate-900 p-3">My Wallet</h1>
        <div className="border border-gray-300 rounded-lg text-lg p-4">Base Currency
          <select value={baseCurrency} onChange={handleBaseCurrencyChange}>
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <h2 className="font-serif text-black p-4 text-center">Total Amount in {baseCurrency} = {totalBaseCurrencyValue.toFixed(2)}</h2>
        <h2 className="font-serif text-black p-4 text-center">Exchange Rate: 1{baseCurrency} - {rate}{selectedCurrency}</h2>
        <select 
            className="cursor-pointer rounded-md border-2 border-solid border-slate-300  text-lg text-center p-3 mb-4"
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
        <br/>
        <input
          className="w-60 h-8 mb-4"
          type="number"
          placeholder="Deposit amount"
          value={depositAmount}
          onChange={handleDepositChange}
        />
        <br/>
        <input
          className="w-60 h-8 mb-4"
          type="number"
          placeholder="Spend amount"
          value={spendAmount}
          onChange={handleSpendChange}
        />
        <br/>
        <button className="transition ease-in-out delay-150 rounded-full bg-sky-500 text-white text-lg  rounded-lg p-2 mb-4" onClick={handleAddCurrency}>Add Currency</button>
        <div>
        {Object.entries(totalCurrencyValue).map(([currency, total]) => (
            <MyCurrencyCard
              key={currency}
              currency={currency}
              totalCurrencyValue={total.toFixed(2)}
            />
          ))}
        </div>
    </div>
  </div>     
    )
}