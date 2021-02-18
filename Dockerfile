FROM node:14

# Create app directory
WORKDIR /usr/src/app


ARG PORT
ENV PORT=$PORT

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE ${PORT}
CMD [ "npm", "run", "start" ]