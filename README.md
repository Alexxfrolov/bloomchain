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
