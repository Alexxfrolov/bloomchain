import Highcharts from "highcharts/highstock"
import merge from "deepmerge"

export class StockChart {
  constructor(container, type = "bitcoin", options) {
    this.container = container
    this.type = type
    this.userOptions = options
    this.chart = null
    this.options = {}
  }

  getSeriesFromOptions() {
    return this.options.series[0]
  }

  fetchData = (type) => {
    return fetch(`/api/index?type=${type}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }

        throw new Error(response.statusText)
      })
      .then((data) => data)
  }

  mergeDefaultOptionsWithUserOptions() {
    const options = {
      chart: {
        height: 800,
        backgroundColor: "#f8f9fa",
      },
      title: {
        align: "left",
      },
      plotOptions: {
        series: {
          color: "rgb(77, 103, 236)",
        },
      },
      rangeSelector: {
        allButtonsEnabled: true,
        selected: 3,
        buttons: [
          {
            type: "hour",
            count: 1,
            text: "1h",
            dataGrouping: {
              forced: false,
              units: [["minute", [15]]],
            },
          },
          {
            type: "hour",
            count: 12,
            text: "12h",
            dataGrouping: {
              forced: false,
              units: [["minute", [15]]],
            },
          },
          {
            type: "day",
            count: 1,
            text: "1d",
            dataGrouping: {
              forced: false,
              units: [["minute", [15]]],
            },
          },
          {
            type: "week",
            count: 1,
            text: "1w",
            dataGrouping: {
              forced: true,
              units: [["minute", [15]]],
            },
          },
          {
            type: "month",
            count: 1,
            text: "1m",
            dataGrouping: {
              forced: false,
              units: [["hour", [12]]],
            },
          },
          {
            type: "month",
            count: 3,
            text: "3m",
            dataGrouping: {
              forced: false,
              units: [["day", [1]]],
            },
          },
          {
            type: "year",
            text: "1y",
            count: 1,
            dataGrouping: {
              forced: false,
              units: [["day", [3]]],
            },
          },
          {
            type: "all",
            text: "All",
            dataGrouping: {
              forced: false,
              units: [["day", [3]]],
            },
          },
        ],
        selected: 2,
        inputPosition: {
          align: "right",
        },
        inputStyle: {
          color: "rgba(0, 0, 0)",
          fontWeight: "bold",
        },
        labelStyle: {
          color: "silver",
          fontWeight: "bold",
        },
        inputBoxBorderColor: "#4d67ec",
        inputEditDateFormat: "%d-%m-%Y",
      },
      tooltip: {
        formatter: function () {
          var point = this.points[0]
          var date_time = new Date(point.x - 10800 * 1000)
          return (
            date_time +
            "<br /><b>" +
            point.series.name +
            ": $" +
            Highcharts.numberFormat(point.y) +
            "</b><br/>"
          )
        },
        shared: true,
      },
      navigator: {
        enabled: false,
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 800,
            },
            chartOptions: {
              chart: {
                height: 400,
              },
              subtitle: {
                text: null,
              },
              navigator: {
                enabled: false,
              },
            },
          },
        ],
      },
    }
    return new Promise((resolve) => {
      return resolve((this.options = merge(options, this.userOptions)))
    })
  }

  createStockChart() {
    this.mergeDefaultOptionsWithUserOptions().then((options) => {
      this.chart = Highcharts.stockChart(this.container, options)
    })
  }

  init() {
    this.createStockChart()

    this.fetchData(this.type).then((data) => {
      this.chart.addSeries({ ...this.getSeriesFromOptions(), data })
    })
  }
}
