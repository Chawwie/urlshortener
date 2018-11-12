FROM node:8.12-alpine

WORKDIR /churl

COPY package.json /churl/package.json
RUN npm install 
RUN mv /churl/node_modules /node_modules

COPY . /churl

RUN npm run build

CMD ["npm", "start"]
