FROM node

ADD . /app

WORKDIR /app

RUN npm install && npm run build

USER node

CMD [ "./cmd.sh" ]
