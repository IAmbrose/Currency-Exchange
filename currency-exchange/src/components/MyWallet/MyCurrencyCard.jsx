

export default function MyCurrencyCard ({ currency, totalCurrencyValue }) {
  
    return (
        <div className="border border-gray-300 rounded-lg text-lg p-4">
            <p>Total {currency}: {totalCurrencyValue}</p>
        </div>
        )
    }