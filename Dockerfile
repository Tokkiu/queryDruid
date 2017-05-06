FROM 127.0.0.1:30100/qingyi/node:7

RUN mkdir -p /opt/node

COPY bin /opt/node/bin
COPY conf /opt/node/conf
COPY public /opt/node/public
COPY routes /opt/node/routes
COPY node_modules /opt/node/node_modules
COPY package.json /opt/node/package.json
COPY app.js /opt/node/app.js

WORKDIR /opt/node
RUN npm install

CMD ["npm", "start"]
