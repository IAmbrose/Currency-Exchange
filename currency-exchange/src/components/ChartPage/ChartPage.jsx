import { useEffect, useState } from "react";
import Chart from "react-apexcharts"

export default function ChartPage () {

    const [startDate, setStartDate] = useState("2020-01-04")
    const [endDate, setEndDate] = useState("2020-01-29")
    const [baseCurrency,setBaseCurrency] = useState("EUR")
    const [quoteCurrency, setQuoteCurrency] = useState("USD")
    const [chartData, setChartData] = useState([])


    useEffect(() => {
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
      }, [startDate, endDate, baseCurrency, quoteCurrency]);

  
    return (
        <div>
        <h1>Historical Exchange Rate Chart</h1>
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
    </div>
    )
}