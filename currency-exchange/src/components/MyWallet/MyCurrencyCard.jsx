import { useState } from "react";

export default function MyCurrencyCard ({ currency }) {
    const [balance, setBalance] = useState(0)
    const [depositAmount, setDepositAmount] = useState("")
    const [spendAmount, setSpendAmount] = useState("")

    function handleDeposit() {
        if (depositAmount > 0) {
            setBalance(balance + parseFloat(depositAmount));
            setDepositAmount("");
        }
    }

    function handleSpend() {
        if(spendAmount > 0 && spendAmount <= balance){
            setBalance(balance - parseFloat(spendAmount));
            setSpendAmount("");
        }
    }


    return (
        <div className="currency-card">
            <h3>{currency}</h3>
                <p>${balance}</p>
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