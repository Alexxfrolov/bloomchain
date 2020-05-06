import Highcharts from "highcharts/highstock"
import merge from "deepmerge"

export class StockChart {
  constructor(container, type = "bitcoin", options) {
    this.container = container
    this.type = type
    this.period = "all"
    this.userOptions = options
    this.chart = null
    this.options = {}
    this.data = []
  }

  getPeriod = (type, count) => {
    if (type === "all") {
      return type
    }
    const shortType = type.slice(0, 1)
    return `${count}${shortType}`
  }

  handlePeriodButtonClick(self) {
    return function () {
      const period = self.getPeriod(this.type, this.count)
      self.fetchData(self.type, period).then((data) => console.log(data))
    }
  }

  getSeriesFromOptions() {
    return this.options.series[0]
  }

  fetchData = (type, period) => {
    return fetch(`/api/index?type=${type}&period=${period}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }

        throw new Error(response.statusText)
      })
      .then((data) => {
        this.data = data
        return data
      })
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
            events: {
              click: this.handlePeriodButtonClick(this),
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
            events: {
              click: this.handlePeriodButtonClick(this),
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
            events: {
              click: this.handlePeriodButtonClick(this),
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
            events: {
              click: this.handlePeriodButtonClick(this),
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
            events: {
              click: this.handlePeriodButtonClick(this),
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
            events: {
              click: this.handlePeriodButtonClick(this),
            },
          },
          {
            type: "year",
            text: "1y",
            dataGrouping: {
              forced: false,
              units: [["day", [3]]],
            },
            events: {
              click: this.handlePeriodButtonClick(this),
            },
          },
          {
            type: "all",
            text: "All",
            dataGrouping: {
              forced: false,
              units: [["day", [3]]],
            },
            events: {
              click: this.handlePeriodButtonClick(this),
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

    this.fetchData(this.type, this.period).then((data) => {
      this.chart.addSeries({ ...this.getSeriesFromOptions(), data })
    })
  }
}
