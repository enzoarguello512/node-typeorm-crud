FROM node:18-alpine3.15

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN apk update
RUN apk add git
RUN npm install

EXPOSE 8080

CMD [ "npm","start" ]
