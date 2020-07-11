FROM node:14

RUN mkdir -p /usr/src/app/server

WORKDIR /usr/src/app/server

COPY package*.json /usr/src/app/server

RUN npm install

RUN npm build

COPY . /usr/src/app/server

EXPOSE 3000

CMD [ "npm", "start" ]