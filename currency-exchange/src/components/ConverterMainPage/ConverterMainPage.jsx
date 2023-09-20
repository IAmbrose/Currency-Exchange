import { useEffect, useState } from 'react'
import ConverterRow from './ConverterRow';
import PopularCurrencies from '../PopularCurrencies/PopularCurrencies';




export default function ConverterMainPage() {

  const [currencies, setCurrencies] = useState([])
  const [baseCurrency, setBaseCurrency] = useState("")
  const [quoteCurrency, setQuoteCurrency] = useState("")
  const [rate, setRate] = useState("")
  const [amount, setAmount] = useState(1)
  const [amountBaseInput, setAmountBaseInput] = useState(true)

  let baseAmount, quoteAmount
    if (amountBaseInput) {
      baseAmount = amount
      quoteAmount = amount * rate
    } else {
      quoteAmount = amount
      baseAmount = amount /rate
    }
    
    useEffect(() => {
      const fetchCurrencies = async () => {
        const response = await fetch(
          `https://api.frankfurter.app/latest`
        );
        const data = await response.json();
        setCurrencies([data.base, ...Object.keys(data.rates)]);
        setBaseCurrency(data.base)
        setQuoteCurrency(Object.keys(data.rates)[0])
        setRate(data.rates[Object.keys(data.rates)[0]])
      };
      fetchCurrencies();
    }, []);
  

  function handleBaseAmountChange(event) {
    setAmount(event.target.value)
    setAmountBaseInput(true)
  }

  function handleQuoteAmountChange(event) {
    setAmount(event.target.value)
    setAmountBaseInput(false)
  }

  useEffect(() => {
    const fetchRate = async () => {
      if (baseCurrency === quoteCurrency) {
        setRate(1);
      } else {
        const response = await fetch(
          `https://api.frankfurter.app/latest?from=${baseCurrency}&to=${quoteCurrency}`
        );
        const data = await response.json();
        setRate(data.rates[quoteCurrency])
      }
    }
      fetchRate();
    }, [baseCurrency, quoteCurrency]);


  return (
    <>
      <h1 className='text-blue-600 font-bold tracking-wide flex-auto text-2xl font-semibold text-slate-900'>Currency Converter</h1>
      <div className='cursor-pointer text-blue-600/100 text-xl focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm'>
      <ConverterRow 
        currencies = {currencies}
        selectCurrency = {baseCurrency}
        onChangeCurrency={event => setBaseCurrency(event.target.value)}
        amount = {baseAmount}
        onChangeAmount={handleBaseAmountChange}
        />
        </div>
      <div>=</div>
      <div className='cursor-pointer text-blue-600/100 text-xl focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm'>
      <ConverterRow 
        currencies = {currencies}
        selectCurrency = {quoteCurrency}  
        onChangeCurrency={event => setQuoteCurrency(event.target.value)}
        amount = {quoteAmount}
        onChangeAmount={handleQuoteAmountChange}
      />
      </div>
      <p>You have converted ${baseAmount}{baseCurrency} to ${quoteAmount}{quoteCurrency}.</p>
      <PopularCurrencies 
       currencies={currencies}
       baseCurrency={baseCurrency}
       setBaseCurrency={setBaseCurrency}
       />
      
    </>
  )
}



