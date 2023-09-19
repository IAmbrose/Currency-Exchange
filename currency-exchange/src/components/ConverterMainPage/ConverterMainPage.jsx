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
      <h1>Currency Converter</h1>
      <ConverterRow
        currencies = {currencies}
        selectCurrency = {baseCurrency}
        onChangeCurrency={event => setBaseCurrency(event.target.value)}
        amount = {baseAmount}
        onChangeAmount={handleBaseAmountChange}
        />
      <div>=</div>
      <ConverterRow 
        currencies = {currencies}
        selectCurrency = {quoteCurrency}  
        onChangeCurrency={event => setQuoteCurrency(event.target.value)}
        amount = {quoteAmount}
        onChangeAmount={handleQuoteAmountChange}
      />
      <p>You have converted ${baseAmount}{baseCurrency} to ${quoteAmount}{quoteCurrency}.</p>
      <PopularCurrencies 
       currencies={currencies}
      />
    </>
  )
}



