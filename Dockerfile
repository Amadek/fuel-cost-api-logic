# Usage (PowerShell):
# docker run -it --rm -p 3000:3000 -e PORT=3000 --name container-name -v ${pwd}:/app image-name

FROM node:10

ADD . /app

WORKDIR /app

RUN npm install

USER node

CMD [ "npm", "run", "dev" ]
