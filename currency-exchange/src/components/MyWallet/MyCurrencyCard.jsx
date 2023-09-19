import { useState } from "react";

export default function MyCurrencyCard ({ currency, exchangeRates, balance, setBalance, baseCurrency }) {
    const [depositAmount, setDepositAmount] = useState("")
    const [spendAmount, setSpendAmount] = useState("")
    const baseCurrencyBalance = balance / ((exchangeRates[currency] || 1))

    function handleDeposit() {
        if (depositAmount > 0) {
            const newBalance = balance + parseFloat(depositAmount)
            setBalance(newBalance);
            setDepositAmount("");
        }
    }

    function handleSpend() {
        if(spendAmount > 0 && spendAmount <= balance){
            const newBalance = balance - parseFloat(spendAmount)
            setBalance(newBalance);
            setSpendAmount("");
        }
    }


    return (
        <div className="currency-card">
            <h3>{currency}</h3>
            <p>
                {currency} Balance: ${balance.toFixed(2)} | {baseCurrency} Balance: $
                {baseCurrencyBalance.toFixed(2)}
            </p>
                <input
                    type="number"
                    placeholder="Deposit Amount"
                    value={depositAmount}
                    onChange={(event) => setDepositAmount(event.target.value)}    
                />
                <button onClick={handleDeposit}>Deposit</button>
                <br />
                {balance>0 && (
                    <>
                    <input
                        type="number"
                        placeholder="Spend Amount"
                        value={spendAmount}
                        onChange={(event) => setSpendAmount(event.target.value)}
                    />
                    <button onClick={handleSpend}>Spend</button>
                    </>
                )}
        </div>
        )
    }