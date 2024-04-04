# Use the official Node.js image as base
FROM node:latest

# Create a directory for the app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY ../../cafe-rewards-backend/package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY ../../cafe-rewards-backend/ .

# Expose port 3000, which is the default port for Express
EXPOSE 3000

# Command to run your Express server
CMD ["node", "app.js"]
