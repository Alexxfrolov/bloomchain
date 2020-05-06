import Highcharts from "highcharts/highstock"
import merge from "deepmerge"

export class StockChart {
  constructor(container, type = "bitcoin", options) {
    this.container = container
    this.type = type
    this.period = "all"
    this.options = merge(options, defaultOptions)
    this.chart = null
  }

  getSeriesFromOptions() {
    return this.options.series[0]
  }

  fetchData() {
    return fetch(`/api/index?type=${this.type}&period=${this.period}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }

        throw new Error(response.statusText)
      })
      .then((data) => data)
  }

  init() {
    this.chart = Highcharts.stockChart(this.container, this.options)

    this.fetchData().then((data) => {
      this.chart.addSeries({ ...this.getSeriesFromOptions(), data })
    })
  }
}

const defaultOptions = {
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
          units: [["hour", [1]]],
        },
      },
      {
        type: "month",
        count: 3,
        text: "3m",
        dataGrouping: {
          forced: false,
          units: [["hour", [12]]],
        },
      },
      {
        type: "year",
        text: "1y",
        dataGrouping: {
          forced: false,
          units: [["day", [1]]],
        },
      },
      {
        type: "all",
        text: "All",
        dataGrouping: {
          forced: false,
          units: [["day", [1]]],
        },
      },
    ],
    selected: 2,
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
