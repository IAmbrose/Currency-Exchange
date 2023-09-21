import CurrencyContainer from "./CurrencyContainer";

export default function ConverterRow ({ currencies, selectCurrency, onChangeCurrency, amount, onChangeAmount }) {
 

  return (
    <div className="cursor-pointer">
      <input className="cursor-pointer border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" type="number" value={amount} onChange={onChangeAmount}/>
      <CurrencyContainer 
        currencies = {currencies} 
        selectCurrency={selectCurrency}
        onChangeCurrency={onChangeCurrency}
        />
    </div>
  );
}
