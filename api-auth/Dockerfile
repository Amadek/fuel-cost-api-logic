FROM node:lts-alpine

ADD . /app

WORKDIR /app

RUN npm install

USER node

CMD [ "./cmd.sh" ]