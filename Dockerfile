FROM node:21.6.1
WORKDIR /usr/code
COPY package.json .
RUN yarn install
COPY . .
ENV SERVER_PORT 3000
EXPOSE $SERVER_PORT
CMD ["sh", "-c", "yarn sequelize db:migrate && yarn run start:prod"]