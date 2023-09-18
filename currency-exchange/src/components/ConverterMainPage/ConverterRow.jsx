import CurrencyContainer from "./CurrencyContainer";

export default function ConverterRow ({ currencies, selectCurrency, onChangeCurrency, amount, onChangeAmount }) {
 

  return (
    <div>
      <input type="number" value={amount} onChange={onChangeAmount}/>
      <CurrencyContainer 
        currencies = {currencies} 
        selectCurrency={selectCurrency}
        onChangeCurrency={onChangeCurrency}
        />
    </div>
  );
}
