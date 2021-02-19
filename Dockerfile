FROM node:12.13.0-alpine

RUN mkdir -p /opt/app
WORKDIR /opt/app

ARG PORT
ENV PORT=$PORT

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY . .
RUN npm install
RUN np run updatedatabase:migrate 
RUN npm run updatedatabase:seed

EXPOSE $PORT
CMD [ "npm" "run" "start" ]