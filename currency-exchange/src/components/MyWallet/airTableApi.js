const API_KEY = "patSDImipgcdw240e.6234edebe3483ec105adbc216120697f07470e6158f4d93346de71aad9ec295d"
const BASE_ID = "appQkFtkhCJQFPz07"
const BASE_URL = "https://api.airtable.com/v0"
const TABLE_ID = "tbltq3l6u0Uqlmegv"

async function getWalletData() {
    
    const response = await fetch(`${BASE_URL}/${BASE_ID}/${TABLE_ID}`, {
        method:"GET",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    return data;
}



async function addWalletData({ currency, rate, base, deposit, spend, totalinbase, total }) {
        const addData = {
            fields:{
                currency,
                rate,
                base,
                deposit,
                spend,
                totalinbase,
                total,
            }
        }
        const response = await fetch(`${BASE_URL}/${BASE_ID}/${TABLE_ID}`, {
            method:"POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addData)
        })
        const data = await response.json();
        return data;
    }



export { getWalletData, addWalletData }