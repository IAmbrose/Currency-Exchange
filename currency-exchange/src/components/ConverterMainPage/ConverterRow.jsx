import CurrencyContainer from "./CurrencyContainer";

export default function ConverterRow ({ currencies, selectCurrency, onChangeCurrency, amount, onChangeAmount }) {
 

  return (
    <div className="cursor-pointer">
      <input className="cursor-pointer" type="number" value={amount} onChange={onChangeAmount}/>
      <CurrencyContainer 
        currencies = {currencies} 
        selectCurrency={selectCurrency}
        onChangeCurrency={onChangeCurrency}
        />
    </div>
  );
}
