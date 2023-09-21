import { useEffect, useState } from "react"



export default function PopularCurrencies ({ currencies }) {
    const [exchangeRates, setExchangeRates] = useState([]);
    const [popularCurrencies, setPopularCurrencies] = useState(["USD", "JPY", "AUD", "SGD"]) 
    const [basePopularCurrency, setBasePopularCurrency] = useState("EUR")
    const [newCurrency, setNewCurrency] = useState("")



    useEffect(() => {
      if(basePopularCurrency && popularCurrencies.length>0) {
        const fetchExchangeRates = async () => {
          const response = await fetch(
            `https://api.frankfurter.app/latest?from=${basePopularCurrency}&to=${popularCurrencies}`
          );
          const data = await response.json();
          setExchangeRates(data.rates);
          }
        fetchExchangeRates();
      }
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
            <h2 className="font-bold tracking-wide flex-auto text-3xl font-semibold text-slate-900 p-4">Popular Currencies</h2>
            <div className="border border-gray-300 rounded-lg text-lg p-4">Base Currency
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
                <ul className="p-10">
                  {popularCurrencies.map((currency) => (
                    <li className="border border-gray-300 rounded-lg text-lg p-4" key={currency}>
                      {currency} -{" "}
                      {basePopularCurrency === currency ? "Base" : exchangeRates[currency]}
                      <button className="text-sm text-red-500 ml-2 px-2 py-1 bg-transparent border border-red-500 hover:bg-red-500 hover:text-white hover:border-transparent focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"onClick={() => handleRemoveCurrency(currency)}>-</button>
                    </li>
                  ))}
                </ul>
            <div>
              <select className="cursor-pointer rounded-md border-2 border-solid border-slate-300  text-lg text-center p-3"
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
                <button className="transition ease-in-out delay-150 rounded-full bg-sky-500 text-white text-lg  rounded-lg p-2" onClick={handleAddCurrency}>Add Currency</button>
            </div>
        </div>
    )
}



