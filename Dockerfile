FROM 10.19.140.200:30100/qingyi/node:7

RUN mkdir -p /opt/gaming

COPY lib /opt/gaming/lib
COPY src /opt/gaming/src
COPY .angular-cli.json /opt/gaming/.angular-cli.json
COPY package.json /opt/gaming/package.json
COPY tsconfig.json /opt/gaming/tsconfig.json
COPY tslint.json /opt/gaming/tslint.json

WORKDIR /opt/gaming

RUN npm install \
    && cp ./src/materialize.css ./node_modules/materialize-css/dist/css/materialize.css

CMD ["npm", "run", "dev"]
