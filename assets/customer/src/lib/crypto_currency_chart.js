import { StockChart } from "./chart"

document.addEventListener("DOMContentLoaded", () => {
  const bitcoin_chart_container = document.getElementById("js-chart-bitcoin")
  const top10_cryptocurrency_chart_container = document.getElementById(
    "js-chart-top10-cryptocurrency",
  )

  if (bitcoin_chart_container) {
    const options = {
      title: {
        text: "BloomChain Bitcoin Price Index (BCBTC Index)",
      },
      yAxis: {
        offset: 40,
      },
      series: [
        {
          name: "BCBTC",
          type: "line",
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
    }
    const bitcoin_chart = new StockChart(
      bitcoin_chart_container,
      "bitcoin",
      options,
    )
    bitcoin_chart.init()
  }

  if (top10_cryptocurrency_chart_container) {
    const options = {
      title: {
        text: "BloomChain Top 10 Cryptocurrency Index (BC10 Index)",
      },
      yAxis: {
        offset: 25,
      },
      series: [
        {
          name: "BC10",
          type: "line",
          line: {
            color: "red",
          },
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
    }
    const top10_cryptocurrency_chart = new StockChart(
      top10_cryptocurrency_chart_container,
      "top_10",
      options,
    )
    top10_cryptocurrency_chart.init()
  }
})
