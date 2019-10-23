FROM node:12-alpine

WORKDIR /app/frontend
COPY . /app/frontend

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && cd /app/frontend && npm install \
    && apk del build-dependencies

RUN npm install --global --unsafe-perm webpack webpack-cli webpack-dev-server

EXPOSE 1234
