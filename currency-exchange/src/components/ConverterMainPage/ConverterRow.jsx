import CurrencyContainer from "./CurrencyContainer";

export default function ConverterRow ({ currencies, selectCurrency, onChangeCurrency, amount, onChangeAmount }) {
 

  return (
    <div>
      <input className="w-60 h-8" type="number" value={amount} onChange={onChangeAmount}/>
      <CurrencyContainer 
        currencies = {currencies} 
        selectCurrency={selectCurrency}
        onChangeCurrency={onChangeCurrency}
        />
    </div>
  );
}
