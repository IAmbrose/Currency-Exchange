import { deleteWalletData } from "./airTableApi"

export default function MyCurrencyCard ({ currency, totalCurrencyValue }) {
    const handleDeleteCurrency = async () => {
        const decision = window.confirm(`Are you sure you want to delete all entries of ${currency}?`)
        if (!decision){
            return;          
        }
        await deleteWalletData ({
            currency
        })
    }
    
    return (
        <div>
            <span>Total {currency}: {totalCurrencyValue}</span>
            <button onClick={handleDeleteCurrency}>Delete</button>
        </div>
        )
    }