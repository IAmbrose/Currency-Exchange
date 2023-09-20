export default function CurrencyContainer ({ currencies, selectCurrency, onChangeCurrency }) {
    
  return (
    <select className="cursor-pointer" value={selectCurrency} onChange={onChangeCurrency}>
      {currencies.map(currency => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
}