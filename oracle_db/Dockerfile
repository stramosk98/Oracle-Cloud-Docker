FROM node:latest

WORKDIR /usr/src/app

# Copy files
COPY package*.json ./

ENV PASSWORD=

RUN npm install

COPY . .

CMD [ "node", "index.js" ]