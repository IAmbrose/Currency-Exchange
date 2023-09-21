export default function CurrencyContainer ({ currencies, selectCurrency, onChangeCurrency }) {
    
  return (
    <select className="cursor-pointer w-25 h-6 p-1" value={selectCurrency} onChange={onChangeCurrency}>
      {currencies.map(currency => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
}