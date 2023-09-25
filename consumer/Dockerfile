FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# RUN npm install
#RUN npm run build
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "npm", "run",  "start"]