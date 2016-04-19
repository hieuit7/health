FROM node:5.10.1
RUN apt-get update -y && apt-get install -y mocha
RUN npm install -g mocha && npm install -g istanbul