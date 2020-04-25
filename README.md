![Elixir CI](https://github.com/Alexxfrolov/bloomchain/workflows/Elixir%20CI/badge.svg)

# Bloomchain

News site app built on Phoenix framework in Elixir.

## Get Started

* Clone repository `git clone https://github.com/Alexxfrolov/bloomchain.git`
* Fetch dependencies with `cd bloomchain && mix deps.get`

### Setup ES
* `docker pull docker.elastic.co/elasticsearch/elasticsearch:7.6.2`
* `docker run --name bloomchain-es -p 9201:9200 -p 9301:9300  -e "discovery.type=single-node" -d docker.elastic.co/elasticsearch/elasticsearch:7.6.2`

### Setup DB
* `docker pull postgres`
* `docker run --name bloomchain-psql -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -d postgres`

### Run migrations and seed data
* Setup database and seed data `mix ecto.setup`

### Start phoenix app
* Start Phoenix server `mix pxh.server`


### Frontend аdmin

Requires [Node.js](https://nodejs.org/) >=10.16.0+ to run.
For installation dependencies and devDependencies run `yarn install`
For starting webpack-dev-server run `yarn start`
For production build run `yarn build`

## BloomChain Bitcoin Price Index
[Binance](https://www.binance.com/) api - `https://www.binance.com/api/v1/ticker/`

[Bitstamp](https://www.bitstamp.net/) api - `https://www.bitstamp.net/api/v2/ticker/`

Для расчета необходимо получить данные за 24 часа по Binance
```sh
GET https://www.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT
```

Response:

```json
{
"symbol": "BTCUSDT",
"priceChange": "-49.78000000",
"priceChangePercent": "-0.655",
"weightedAvgPrice": "7511.13991629",
"prevClosePrice": "7601.67000000",
"lastPrice": "7551.10000000",
"lastQty": "0.00836300",
"bidPrice": "7550.84000000",
"bidQty": "0.12565100",
"askPrice": "7551.67000000",
"askQty": "0.00977900",
"openPrice": "7600.88000000",
"highPrice": "7610.00000000",
"lowPrice": "7388.00000000",
"volume": "53136.80482200",
"quoteVolume": "399117975.72259032",
"openTime": 1587720725532,
"closeTime": 1587807125532,
"firstId": 300284859,
"lastId": 300833831,
"count": 548973
}
```

Required fields:
1) `lastPrice` - актуальная цена BTC к USD за 24 часа
2) `quoteVolume ` - оборот BTC за 24 часа

Для расчета необходимо получить данные за 24 часа по Bitstamp
```sh
GET https://www.bitstamp.net/api/v2/ticker/btcusd
```

Response:

```json
{
  "high": "7612.91",
  "last": "7524.62",
  "timestamp": "1587804441",
  "bid": "7524.81",
  "vwap": "7524.97",
  "volume": "6973.83165213",
  "low": "7391.57",
  "ask": "7532.55",
  "open": "7518.81"
}
```

Required fields:
1) `last` - актуальная цена BTC к USD за 24 часа
2) `volume ` - оборот BTC за 24 часа

Рассчет
```js
const value = ((quoteVolume * lastPrice + volume * last) / (quoteVolume + volume)).toFixed(2)
```

