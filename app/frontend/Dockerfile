FROM node:12.12-slim

WORKDIR /app/frontend

COPY . /app/frontend

RUN cd /app/frontend && npm install --no-audit
CMD cd /app/frontend && npm run start

EXPOSE 1234
