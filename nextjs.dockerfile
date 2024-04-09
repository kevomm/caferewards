# Use an official Node.js runtime as a parent image
FROM node

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the application code to the working directory
COPY ./cafe-rewards-frontend/caferewards-client/ .

# Install dependencies
RUN npm install


# Build the Next.js application
RUN npm run build

# Expose port 3001 to the outside world
EXPOSE 3001

#######################################################
ENV PROD=false

# Define the command to run the Next.js application
CMD ["npm", "start"]
