FROM node:12.12-buster-slim

WORKDIR /app/frontend

COPY package.json package-lock.json /app/frontend/

RUN npm install

COPY . /app/frontend

EXPOSE 1234

CMD npm start
