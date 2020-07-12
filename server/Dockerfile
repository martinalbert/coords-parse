FROM node:14

WORKDIR /usr/src/app/

COPY package.json .

RUN npm install

ADD . /usr/src/app

RUN npm build

EXPOSE 3000

CMD [ "npm", "start" ]