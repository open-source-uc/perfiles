FROM node:18-alpine

COPY package.json .
COPY package-lock.json .
ADD . .

RUN npm i

CMD [ "npm", "run", "start" ]
