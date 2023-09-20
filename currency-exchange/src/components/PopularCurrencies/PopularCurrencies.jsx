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
            <h2 className="text-blue-600 font-bold tracking-wide flex-auto text-2xl font-semibold text-slate-900">Popular Currencies</h2>
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
                <ul className="p-10 divide-y divide-slate-300">
                  {popularCurrencies.map((currency) => (
                    <li className="text-blue-600/100 text-xl focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" key={currency}>
                      {currency} -{" "}
                      {basePopularCurrency === currency ? "Base" : exchangeRates[currency]}
                      <button onClick={() => handleRemoveCurrency(currency)}>Remove</button>
                    </li>
                  ))}
                </ul>
            <div>
              <select className="cursor-pointer hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3"
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
                <button className="transition ease-in-out delay-150 rounded-full bg-sky-500 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg" onClick={handleAddCurrency}>Add Currency</button>
            </div>
        </div>
    )
}



