FROM node

ADD . /app

WORKDIR /app

RUN npm install

USER node

CMD [ "./cmd.sh" ]
