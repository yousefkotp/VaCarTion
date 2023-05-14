FROM node:18.15.0-alpine3.16

WORKDIR /app

COPY ./package*.json ./

RUN npm ci

EXPOSE 3000

COPY ./ ./

CMD [ "node", "index.js" ]