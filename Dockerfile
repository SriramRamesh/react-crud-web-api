FROM node:10.15.0-alpine

WORKDIR /usr/app

COPY package*.json ./

# RUN npm ci -qy
RUN yarn start

COPY . .

EXPOSE 8081

CMD ["yarn", "start"]

