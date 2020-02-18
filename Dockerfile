FROM node:10

ADD . /opt/fuelcost

WORKDIR /opt/fuelcost

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
