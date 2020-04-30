FROM node:slim as build

WORKDIR /app/frontend

RUN apt-get update && apt-get install -yq g++ build-essential python make git wget

# Install latest chrome dev package for react-snap
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN npm install --global --unsafe-perm webpack webpack-cli webpack-dev-server

COPY ./package.json /app/frontend/package.json
RUN cd /app/frontend && npm install

COPY . /app/frontend

EXPOSE 1234
