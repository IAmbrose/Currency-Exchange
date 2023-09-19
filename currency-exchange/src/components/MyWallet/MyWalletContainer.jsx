import { useEffect, useState } from "react";
import MyCurrencyCard from "./MyCurrencyCard";


export default function MyWalletContainer () {
    const [currencies, setCurrencies] = useState([])
    const [baseCurrency, setBaseCurrency] = useState("EUR")
    const [selectedCurrency, setSelectedCurrency] = useState(["USD"])
    const [newCurrency, setNewCurrency] = useState("")
    const [exchangeRates, setExchangeRates] = useState([]);
    const [balances, setBalances] = useState({});
    const [totalValue, setTotalValue] = useState(0);
    
    useEffect(() => {
        const fetchCurrencies = async () => {
          const response = await fetch(
            `https://api.frankfurter.app/latest`
          );
          const data = await response.json();
          setCurrencies([data.base, ...Object.keys(data.rates)]);
          setBaseCurrency(data.base)
        };
        fetchCurrencies();
      }, []);

      useEffect(() => {
        const fetchExchangeRates = async () => {
          const response = await fetch(
            `https://api.frankfurter.app/latest?from=${baseCurrency}&to=${selectedCurrency}`
          );
          const data = await response.json();
          setExchangeRates(data.rates);
          }
        fetchExchangeRates();
      }, [baseCurrency, selectedCurrency]);


      const handleAddCurrency = () => {
        if (newCurrency && !selectedCurrency.includes(newCurrency)) {
          setSelectedCurrency([...selectedCurrency, newCurrency]);
          setNewCurrency("")
        }
      }

      useEffect(() => {
        let total = 0;
        selectedCurrency.forEach((currency) => {
          if (balances[currency] && exchangeRates[currency]) {
            total += balances[currency] / exchangeRates[currency];
          }
        });
        setTotalValue(total);
      }, [selectedCurrency, balances, exchangeRates]);



    return (
        <div>
        <h1>My Wallet</h1>
        <h2>Base Currency - {baseCurrency}</h2>
        <h4>Total Value in {baseCurrency}: ${totalValue.toFixed(2)}</h4>
        <select
            value={newCurrency}
            onChange={(event) => setNewCurrency(event.target.value)}
            >
                <option value="">Select a currency</option>
                {currencies.map((option) => (
                    <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        <button onClick={handleAddCurrency}>Add Currency</button>
        <div className="wallet-container">
            {selectedCurrency.map((currency) => (
                <MyCurrencyCard
                  key = {currency}
                  currency = {currency}
                  exchangeRates={exchangeRates}
                  balance={balances[currency] || 0}
                  setBalance={(newBalance) =>
                    setBalances({ ...balances, [currency]: newBalance })
                  }
                  baseCurrency={baseCurrency}
                 />
            ))}
        </div>
    </div>
        
    )
}