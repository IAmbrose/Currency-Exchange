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
    <div className='bg-sky-100 border-solid border-2 border-teal-200 rounded-lg max-w-sm'>
      <h1 className='bg-blue-950 text-white font-bold tracking-wide flex-auto text-4xl font-semibold text-slate-900 p-3 rounded-lg'>Currency Converter</h1>
      <div className='cursor-pointer text-blue-600/100 text-xl focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 p-3'>
      <ConverterRow 
        currencies = {currencies}
        selectCurrency = {baseCurrency}
        onChangeCurrency={event => setBaseCurrency(event.target.value)}
        amount = {baseAmount}
        onChangeAmount={handleBaseAmountChange}
        />
        </div>
      <div>=</div>
      <div className='cursor-pointer text-blue-600/100 text-xl focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 p-3'>
      <ConverterRow 
        currencies = {currencies}
        selectCurrency = {quoteCurrency}  
        onChangeCurrency={event => setQuoteCurrency(event.target.value)}
        amount = {quoteAmount}
        onChangeAmount={handleQuoteAmountChange}
      />
      </div>
      <p className='font-serif text-black p-4 text-justify'>You have converted ${baseAmount}{baseCurrency} to ${quoteAmount}{quoteCurrency}.</p>
      <PopularCurrencies 
       currencies={currencies}
       />
      </div>
    </>
  )
}



