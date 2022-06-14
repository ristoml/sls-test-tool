FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
ENV PORT=3000
ENV MONGODB_URI=mongodb://user6WS:c3jaAQHqh3SCqaNk@mongodb/sampledb
CMD ["npm","run","start"]