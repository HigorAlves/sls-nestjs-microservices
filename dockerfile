FROM node:16-slim
WORKDIR /src/
COPY package.json yarn.lock /src/
RUN yarn
COPY . .
CMD yarn dev
