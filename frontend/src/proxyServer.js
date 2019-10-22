const proxy = require('http-proxy-middleware');
const Bundler = require('parcel-bundler');
const express = require('express');

const bundler = new Bundler('index.html', {
  cache: false,
});

const app = express();

app.use(
  proxy(['/api', '/__debug__'], {
    target: 'http://backend:8000',
  }),
);

app.use(
  proxy('/ws', {
    target: 'http://daphne:9000',
    ws: true,
  }),
);

app.use(bundler.middleware());

app.listen(Number(process.env.PORT || 1234));
