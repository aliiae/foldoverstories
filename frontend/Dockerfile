FROM node:12-alpine

WORKDIR /app/frontend

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++

RUN npm install --global --unsafe-perm webpack webpack-cli webpack-dev-server

COPY ./package.json /app/frontend/package.json
RUN cd /app/frontend && npm install && apk del build-dependencies

COPY . /app/frontend

EXPOSE 1234
