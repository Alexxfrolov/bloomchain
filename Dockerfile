FROM elixir:1.10.3-alpine

# Install NPM
RUN \
    mkdir -p /opt/app && \
    chmod -R 777 /opt/app && \
    apk update && \
    apk --no-cache --update add \
    make \
    g++ \
    wget \
    curl \
    git \
    inotify-tools \
    file \
    imagemagick \
    pngcrush \
    optipng \
    nodejs \
    nodejs-npm && \
    npm install npm -g --no-progress && \
    npm install yarn -g --no-progress && \
    update-ca-certificates --fresh && \
    rm -rf /var/cache/apk/*

# Add local node module binaries to PATH
ENV PATH=./node_modules/.bin:$PATH

# print current node & npm version
RUN node --version; npm --version;

EXPOSE 4000

COPY . /opt/app

ENV MIX_ENV=prod
ENV SECRET_KEY_BASE=$SECRET_KEY_BASE

# Ensure latest versions of Hex/Rebar are installed on build
RUN mix do local.hex --force, local.rebar --force

WORKDIR /opt/app

RUN mix do deps.get, deps.compile

WORKDIR /opt/app/assets

RUN yarn
RUN npm run-script build

WORKDIR /opt/app

RUN mix compile
RUN mix phx.digest
