import { useEffect, useState } from "react";
import Chart from "react-apexcharts"

export default function ChartPage () {

    const [startDate, setStartDate] = useState("2022-10-14")
    const [endDate, setEndDate] = useState("2022-11-14")
    const [baseCurrency,setBaseCurrency] = useState("EUR")
    const [quoteCurrency, setQuoteCurrency] = useState("USD")
    const [chartData, setChartData] = useState([])


    const handleSubmit = () => {
        const fetchCurrencies = async () => {
          const response = await fetch(
            `https://api.frankfurter.app/${startDate}..${endDate}?from=${baseCurrency}&to=${quoteCurrency}`
          );
          const data = await response.json();

          const dates = Object.keys(data.rates);
          const rates = dates.map((date) => data.rates[date][quoteCurrency]);


          setChartData({
                options: {
                    chart: {
                        id: "exchange-rate-chart"
                    },
                    xaxis: {
                        categories: dates 
                    },
                    yaxis: {
                        title: {
                            text: `Exchange Rate (${baseCurrency} to ${quoteCurrency})`
                        }
                    }
                },
                series: [
                    {
                        name: `${baseCurrency} to ${quoteCurrency}`,
                        data: rates
                    }
                ]
            });

          setStartDate(data.start_date)
          setEndDate(data.end_date)
        };
        fetchCurrencies();
      };

      useEffect(() => {
        handleSubmit();
      },[baseCurrency, quoteCurrency]);

      const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
      };

      const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
      };

      const handleBaseCurrencyChange = (event) => {
        setBaseCurrency(event.target.value);
      };

      const handleQuoteCurrencyChange = (event) => {
        setQuoteCurrency(event.target.value);
      };

  
    return (
        <div>
        <h1>Historical Exchange Rate Chart</h1>
        <h3>{baseCurrency} to {quoteCurrency}</h3>
        <div>
            {chartData && chartData?.series &&(
                <Chart
                options={chartData.options}
                series={chartData.series}
                type="line"
                width="100%"
                height="400"
                />
            )}
        </div>
        <label>Start Date:</label>
        <input
            type="date"
            onChange={handleStartDateChange}
        />
        <label>End Date:</label>
        <input
            type="date"
            onChange={handleEndDateChange}
        />
        <button onClick={handleSubmit}>Change Dates</button>
        <br/>
        <label>Base Currency:</label>
        <input
            type="text"
            onChange={handleBaseCurrencyChange}
            value={baseCurrency}
        />
        <label>Quote Currency:</label>
        <input
            type="text"
            onChange={handleQuoteCurrencyChange}
            value={quoteCurrency}
        />
        <button onClick={handleSubmit}>Change Currencies</button>
    </div>
    )
}