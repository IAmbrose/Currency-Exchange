export default function CurrencyContainer ({ currencies, selectCurrency, onChangeCurrency }) {
    
  return (
    <select className="cursor-pointer w-25 h-6" value={selectCurrency} onChange={onChangeCurrency}>
      {currencies.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}