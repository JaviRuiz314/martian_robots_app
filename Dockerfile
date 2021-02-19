FROM node:14


WORKDIR /usr/src/app


ARG PORT
ENV PORT=$PORT

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}
CMD [ "npm", "run", "start" ]