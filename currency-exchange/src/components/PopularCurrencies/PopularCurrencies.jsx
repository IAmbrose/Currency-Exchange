import { useEffect, useState } from "react"



export default function PopularCurrencies ({ currencies}) {
    const [exchangeRates, setExchangeRates] = useState([]);
    const [popularCurrencies, setPopularCurrencies] = useState(["USD", "JPY", "AUD", "SGD"]) 
    const [basePopularCurrency, setBasePopularCurrency] = useState("EUR")
    const [newCurrency, setNewCurrency] = useState("")



    useEffect(() => {
        const fetchExchangeRates = async () => {
          const response = await fetch(
            `https://api.frankfurter.app/latest?from=${basePopularCurrency}&to=${popularCurrencies}`
          );
          const data = await response.json();
          setExchangeRates(data.rates);
          }
        fetchExchangeRates();
      }, [basePopularCurrency, popularCurrencies]);

      const handleAddCurrency = () => {
        if (newCurrency && !popularCurrencies.includes(newCurrency)) {
          setPopularCurrencies([...popularCurrencies, newCurrency]);
          setNewCurrency("")
        }
      }

      const handleRemoveCurrency = (currencyToRemove) => {
        const updatedCurrencies = popularCurrencies.filter(
          (currency) => currency !== currencyToRemove
        )
        setPopularCurrencies(updatedCurrencies)
      }
      
      const handleBasePopularCurrencyChange = (event) => {
        setBasePopularCurrency(event.target.value)
      }

      const handleNewCurrencyChange = (event) => {
        setNewCurrency(event.target.value)
      }

    return(
        <div>
            <h2>Popular Currencies</h2>
            <div>Base Currency
              <select
                value={basePopularCurrency}
                onChange={handleBasePopularCurrencyChange}
                >
                  <option value={basePopularCurrency}>{basePopularCurrency}</option>
                  {currencies.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            <ul>
              {popularCurrencies.map((currency) => (
                <li key={currency}>
                  {currency} - {exchangeRates[currency]}
                  <button onClick={() => handleRemoveCurrency(currency)}>Remove</button>
                </li>
              ))}
            </ul>
            <div>
              <select
                value={newCurrency}
                onChange={handleNewCurrencyChange}
                >
                  <option value="">Select a currency</option>
                  {currencies.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button onClick={handleAddCurrency}>Add</button>
            </div>
        </div>
    )
}



