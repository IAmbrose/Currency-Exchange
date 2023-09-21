import { useEffect, useState } from "react";
import Chart from "react-apexcharts"

export default function ChartPage () {
    const [currencies, setCurrencies] = useState([])
    const [startDate, setStartDate] = useState("2022-10-14")
    const [endDate, setEndDate] = useState("2022-11-14")
    const [baseCurrency,setBaseCurrency] = useState("EUR")
    const [quoteCurrency, setQuoteCurrency] = useState("USD")
    const [chartData, setChartData] = useState([])


    useEffect(() => {
      const fetchCurrencies = async () => {
        const response = await fetch(
          `https://api.frankfurter.app/latest`
        );
        const data = await response.json();
        setCurrencies([data.base, ...Object.keys(data.rates)]);
      };
      fetchCurrencies();
    }, []);

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
        <div className="bg-teal-100 border-solid border-2 border-teal-200 rounded-lg max-w-sm">
        <h1 className="bg-teal-500 font-bold tracking-wide flex-auto text-4xl font-semibold text-slate-900 p-3">Historical Exchange Rate Chart</h1>
        <h3 className="border border-gray-300 rounded-lg text-lg p-4">{baseCurrency} to {quoteCurrency}</h3>
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
          className="mb-4"
          type="date"
          onChange={handleStartDateChange}
        />
        <br/>
        <label>End Date:</label>
        <input 
          className="mb-4"
          type="date"
          onChange={handleEndDateChange}
        />
        <br/>
        <button className="transition ease-in-out delay-150 rounded-full bg-sky-500 text-white text-lg  rounded-lg p-2 mb-4" onClick={handleSubmit}>Change Dates</button>
        <br/>
        <label>Base Currency:</label>
        <select
          value={baseCurrency}
          onChange={handleBaseCurrencyChange}
          >
            <option value={baseCurrency}>{baseCurrency}</option>
            {currencies.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        <label>Quote Currency:</label>
        <select
          value={quoteCurrency}
          onChange={handleQuoteCurrencyChange}
          >
            <option value={quoteCurrency}>{quoteCurrency}</option>
            {currencies.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
    </div>
    )
}